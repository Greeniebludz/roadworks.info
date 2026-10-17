<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Road Works Map — roadworks.info</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { height: 100%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    #map { width: 100%; height: 100%; }

    #callout-details {
      position: fixed; bottom: 0; left: 0; right: 0;
      max-height: 50vh; overflow-y: auto;
      background: #fff; padding: 16px 20px;
      border-top: 2px solid #e0e0e0;
      box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
      z-index: 1000;
      transition: max-height 0.3s ease;
    }
    #callout-details.hidden { display: none; }
    #callout-details h2 { font-size: 18px; margin-bottom: 4px; }
    #callout-details h3 { font-size: 14px; font-weight: normal; color: #555; margin-bottom: 8px; }
    #callout-details p, #callout-details div { font-size: 13px; line-height: 1.6; }
    #callout-details hr { border: none; border-top: 1px solid #eee; margin: 8px 0; }
    #callout-details strong { color: #333; }

    #callout-toggle {
      position: fixed; bottom: 50px; right: 20px;
      background: #fff; border: 1px solid #ccc; border-radius: 4px;
      padding: 4px 8px; cursor: pointer; z-index: 1001; font-size: 12px;
    }

    #loading {
      position: fixed; top: 10px; left: 50%; transform: translateX(-50%);
      background: rgba(0,0,0,0.7); color: #fff; padding: 6px 16px;
      border-radius: 20px; font-size: 13px; z-index: 1001;
      display: none;
    }

    #status-bar {
      position: fixed; top: 10px; right: 10px;
      background: rgba(255,255,255,0.9); padding: 6px 12px;
      border-radius: 4px; font-size: 12px; z-index: 1000;
      box-shadow: 0 1px 4px rgba(0,0,0,0.15);
    }
    .cluster-count {
      background: #ff6600; color: #fff; border-radius: 50%;
      width: 30px; height: 30px; line-height: 30px; text-align: center;
      font-size: 12px; font-weight: bold; border: 2px solid #fff;
    }
    .cluster-count.planned { background: #2196F3; }
    .cluster-count.mixed { background: #9C27B0; }
  </style>
</head>
<body>
  <div id="map"></div>
  <div id="loading">Loading road works…</div>
  <div id="status-bar"></div>
  <div id="callout-toggle" style="display:none;">▲</div>
  <div id="callout-details" class="hidden"></div>

  <script>
    const API_BASE = 'https://api.roadworks.info';
    const MAPTILER_KEY = '84APRuB9gcvyT3xzXkKa';
    const CLUSTER_ZOOM = 11;

    // --- Icons ---
    const icons = {
      "two-way signals": L.icon({ iconUrl: '/icons/tsa-icon.png', iconSize: [32, 32] }),
      "some carriageway incursion": L.icon({ iconUrl: '/icons/c-icon.png', iconSize: [32, 32] }),
      "give and take": L.icon({ iconUrl: '/icons/rwa-tbc-icon.png', iconSize: [32, 32] }),
      "lane closure": L.icon({ iconUrl: '/icons/rwa-tbc-icon.png', iconSize: [32, 32] }),
      "no carriageway incursion": L.icon({ iconUrl: '/icons/c-icon.png', iconSize: [32, 32] }),
      "road closure": L.icon({ iconUrl: '/icons/road-closure-icon.png', iconSize: [32, 32] }),
    };
    const defaultIcon = L.icon({ iconUrl: '/icons/c-icon.png', iconSize: [32, 32] });

    // --- Map setup ---
    const map = L.map('map').setView([51.4545, -0.9781], 12);

    L.tileLayer(
      `https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`,
      { attribution: '&copy; MapTiler &copy; OpenStreetMap contributors', maxZoom: 19 }
    ).addTo(map);

    let featuresLayer = null;
    let clusterLayer = null;
    let currentMode = null;
    let isLoading = false;

    // --- Loading indicator ---
    function showLoading() {
      document.getElementById('loading').style.display = 'block';
    }
    function hideLoading() {
      document.getElementById('loading').style.display = 'none';
    }

    // --- Status bar ---
    function updateStatus(mode, count) {
      const bar = document.getElementById('status-bar');
      if (mode === 'clusters') {
        bar.textContent = `Zoom ${map.getZoom()} — showing ${count} cluster cells`;
      } else {
        bar.textContent = `Zoom ${map.getZoom()} — showing ${count} features`;
      }
    }

    // --- Convert API response to GeoJSON ---
    function featuresToGeoJSON(features) {
      return {
        type: 'FeatureCollection',
        features: (features || []).map(f => ({
          type: 'Feature',
          geometry: f.geometry,
          properties: {
            public_id: f.public_id,
            status: f.status,
            effective_from: f.effective_from,
            effective_to: f.effective_to,
            is_live: f.is_live,
            rep_lon: f.rep_lon,
            rep_lat: f.rep_lat,
          }
        }))
      };
    }

    // --- Load features from API ---
    async function loadFeatures() {
      if (isLoading) return;
      isLoading = true;
      showLoading();

      const zoom = map.getZoom();
      const bounds = map.getBounds();
      const min_lon = bounds.getWest();
      const min_lat = bounds.getSouth();
      const max_lon = bounds.getEast();
      const max_lat = bounds.getNorth();

      const params = new URLSearchParams({
        zoom: String(zoom),
        min_lon: min_lon.toFixed(6),
        min_lat: min_lat.toFixed(6),
        max_lon: max_lon.toFixed(6),
        max_lat: max_lat.toFixed(6),
      });

      try {
        const res = await fetch(`${API_BASE}/api/features?${params}`);
        const data = await res.json();

        // Remove old layers
        if (featuresLayer) { map.removeLayer(featuresLayer); featuresLayer = null; }
        if (clusterLayer) { map.removeLayer(clusterLayer); clusterLayer = null; }

        if (data.serving_mode === 'clusters') {
          renderClusters(data.clusters);
          updateStatus('clusters', data.clusters.length);
          currentMode = 'clusters';
        } else {
          renderFeatures(data.features);
          updateStatus('features', data.features.length);
          currentMode = 'features';
        }
      } catch (err) {
        console.error('Failed to load features:', err);
      } finally {
        hideLoading();
        isLoading = false;
      }
    }

    // --- Render clusters (low zoom) ---
    function renderClusters(clusters) {
      clusterLayer = L.layerGroup();

      for (const cell of clusters) {
        const latlng = [cell.centroid_lat, cell.centroid_lon];
        const statusKeys = Object.keys(cell.statuses || {});
        const isMixed = statusKeys.length > 1;
        const isPlanned = statusKeys.length === 1 && statusKeys[0] === 'planned';

        const className = isMixed ? 'cluster-count mixed' : isPlanned ? 'cluster-count planned' : 'cluster-count';

        const marker = L.marker(latlng, {
          icon: L.divIcon({
            className: '',
            html: `<div class="${className}">${cell.count}</div>`,
            iconSize: [30, 30],
          })
        });

        const statusBreakdown = statusKeys
          .map(s => `${s}: ${cell.statuses[s]}`)
          .join(', ');

        marker.bindPopup(`<b>${cell.count} road works</b><br>${statusBreakdown}`);
        marker.addTo(clusterLayer);
      }

      clusterLayer.addTo(map);
    }

    // --- Render features (high zoom) ---
    function renderFeatures(features) {
      const geojson = featuresToGeoJSON(features);
      const centerMarkers = [];

      featuresLayer = L.geoJSON(geojson, {
        style: (feature) => {
          if (feature.geometry?.type === 'LineString') return { color: '#ff6600', weight: 3, opacity: 0.8 };
          if (feature.geometry?.type === 'Polygon') return { color: '#3388ff', weight: 2, fillColor: '#3388ff', fillOpacity: 0.2 };
          return { color: '#3388ff' };
        },

        pointToLayer: (feature, latlng) =>
          L.marker(latlng, { icon: defaultIcon }),

        onEachFeature: (feature, layer) => {
          const p = feature.properties || {};

          // Popup with basic info
          const popup = `<b>${p.public_id ?? 'Unknown'}</b><br>` +
                        `Status: ${p.status ?? '—'}<br>` +
                        `Live: ${p.is_live ? 'Yes' : 'No'}<br>` +
                        `Effective: ${p.effective_from ? new Date(p.effective_from).toLocaleDateString() : '—'} → ${p.effective_to ? new Date(p.effective_to).toLocaleDateString() : 'open'}`;

          layer.bindPopup(popup);

          // Click → fetch timeline for callout panel
          layer.on('click', () => {
            if (p.public_id) showCallout(p.public_id);
          });

          // Center marker for non-point geometries
          if (feature.geometry?.type !== 'Point' && feature.geometry?.type !== null) {
            try {
              const center = layer.getBounds().getCenter();
              const marker = L.marker(center, { icon: defaultIcon })
                .bindPopup(popup)
                .on('click', () => {
                  if (p.public_id) showCallout(p.public_id);
                });
              centerMarkers.push(marker);
            } catch (e) { /* getBounds fails for some geometries */ }
          }
        }
      }).addTo(map);

      centerMarkers.forEach(m => m.addTo(map));
    }

    // --- Fetch timeline and show callout panel ---
    async function showCallout(publicId) {
      const panel = document.getElementById('callout-details');
      const toggle = document.getElementById('callout-toggle');
      panel.classList.remove('hidden');
      toggle.style.display = 'block';
      panel.innerHTML = '<p>Loading details…</p>';

      try {
        const res = await fetch(`${API_BASE}/api/timeline/${publicId}`);
        if (!res.ok) {
          panel.innerHTML = `<p>Unable to load details for ${publicId}</p>`;
          return;
        }
        const data = await res.json();

        // Use the latest event's payload for the callout
        const events = data.timeline || [];
        const latest = events[events.length - 1];
        const payload = latest?.payload || {};
        const entity = data.entity || {};

        const friendlyStart = entity.effective_from
          ? new Date(entity.effective_from).toLocaleString() : null;
        const friendlyEnd = entity.effective_to
          ? new Date(entity.effective_to).toLocaleString() : null;

        const sources = (data.attribution?.sources || []).join(', ');

        panel.innerHTML = `
          <h2>${payload.promoter_organisation || payload.work_reference_number || publicId}</h2>
          <h3>${payload.traffic_management_type || 'Road works'}</h3>
          <p>
            ${payload.works_location_type ? `<div><strong>Location Type:</strong> ${payload.works_location_type}</div>` : ""}
            ${payload.work_category ? `<div><strong>Work Category:</strong> ${payload.work_category}</div>` : ""}
            ${payload.activity_type ? `<div><strong>Activity:</strong> ${payload.activity_type}</div>` : ""}
          </p>
          <hr/>
          ${friendlyStart ? `<p><strong>Start:</strong> ${friendlyStart}</p>` : ""}
          ${friendlyEnd ? `<p><strong>End:</strong> ${friendlyEnd}</p>` : ""}
          <hr/>
          ${payload.street_name ? `<div><strong>Street:</strong> ${payload.street_name}</div>` : ""}
          ${payload.town ? `<div><strong>Town:</strong> ${payload.town}</div>` : ""}
          ${payload.area_name ? `<div><strong>Area:</strong> ${payload.area_name}</div>` : ""}
          ${payload.highway_authority ? `<div><strong>Highway Authority:</strong> ${payload.highway_authority}</div>` : ""}
          <hr/>
          <div><strong>Status:</strong> ${entity.status || '—'}</div>
          <div><strong>Live:</strong> ${entity.is_live ? 'Yes' : 'No'}</div>
          <hr/>
          <div><strong>Events:</strong> ${events.length} (from ${sources || 'unknown'})</div>
          ${data.attribution?.stale_warnings?.length ? `<div style="color:#e65100;"><strong>⚠ Stale data:</strong> ${data.attribution.stale_warnings.map(w => w.source).join(', ')}</div>` : ''}
        `;
      } catch (err) {
        panel.innerHTML = `<p>Error loading details: ${err.message}</p>`;
      }
    }

    // --- Callout toggle ---
    document.getElementById('callout-toggle').addEventListener('click', () => {
      const panel = document.getElementById('callout-details');
      const toggle = document.getElementById('callout-toggle');
      const expanded = panel.classList.toggle('expanded');
      toggle.textContent = expanded ? '▼' : '▲';
    });

    // --- Reload on map move (debounced) ---
    let moveTimer = null;
    map.on('moveend zoomend', () => {
      clearTimeout(moveTimer);
      moveTimer = setTimeout(loadFeatures, 300);
    });

    // --- Initial load ---
    loadFeatures();
  </script>
</body>
</html>
