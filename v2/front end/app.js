const API_BASE = 'https://api.roadworks.info';
const MAPTILER_KEY = '84APRuB9gcvyT3xzXkKa';
const CLUSTER_ZOOM = 11;

const map = L.map("map").setView([51.4545, -0.9781], 12);

L.tileLayer(
  `https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`,
  { attribution: "&copy; MapTiler &copy; OpenStreetMap contributors" }
).addTo(map);

// --- Custom TSRGD-style icons (from v2) ---
const icons = {
  "two-way signals": L.icon({ iconUrl: "/icons/tsa-icon.png", iconSize: [32, 32] }),
  "some carriageway incursion": L.icon({ iconUrl: "/icons/c-icon.png", iconSize: [32, 32] }),
  "give and take": L.icon({ iconUrl: "/icons/rwa-tbc-icon.png", iconSize: [32, 32] }),
  "lane closure": L.icon({ iconUrl: "/icons/rwa-tbc-icon.png", iconSize: [32, 32] }),
  "no carriageway incursion": L.icon({ iconUrl: "/icons/c-icon.png", iconSize: [32, 32] }),
  "road closure": L.icon({ iconUrl: "/icons/road-closure-icon.png", iconSize: [32, 32] }),
};

const defaultIcon = L.icon({
  iconUrl: "/icons/c-icon.png",
  iconSize: [32, 32],
});

// --- Layers ---
let featuresLayer = null;
let clusterLayer = null;
let isLoading = false;

// --- Sidebar callout elements ---
const calloutBody = document.getElementById("callout-details");
const calloutToggle = document.getElementById("callout-toggle");
const calloutBox = document.getElementById("info-callout");

// --- Toggle behaviour ---
calloutBox.addEventListener("click", () => {
  const expanded = calloutBox.classList.toggle("expanded");
  calloutToggle.textContent = expanded ? "▲" : "▼";
});

// --- Helper: choose icon based on TM type ---
function getIconFromFeature(feature) {
  const tm = feature.properties?.traffic_management_type;
  return icons[tm] || defaultIcon;
}

// --- Convert API features → GeoJSON ---
function toGeoJSON(features) {
  return {
    type: "FeatureCollection",
    features: features.map((f) => ({
      type: "Feature",
      geometry: f.geometry,
      properties: {
        public_id: f.public_id,
        status: f.status,
        is_live: f.is_live,
        effective_from: f.effective_from,
        effective_to: f.effective_to,
        traffic_management_type: f.payload?.traffic_management_type,
        promoter_organisation: f.payload?.promoter_organisation,
        street_name: f.payload?.street_name,
        town: f.payload?.town,
        area_name: f.payload?.area_name,
        highway_authority: f.payload?.highway_authority,
      },
    })),
  };
}

// --- Load features from v3 API ---
async function loadFeatures() {
  if (isLoading) return;
  isLoading = true;

  const bounds = map.getBounds();
  const params = new URLSearchParams({
    zoom: map.getZoom(),
    min_lon: bounds.getWest().toFixed(6),
    min_lat: bounds.getSouth().toFixed(6),
    max_lon: bounds.getEast().toFixed(6),
    max_lat: bounds.getNorth().toFixed(6),
  });

  try {
    const res = await fetch(`${API_BASE}/api/features?${params}`);
    const data = await res.json();

    // Remove old layers
    if (featuresLayer) map.removeLayer(featuresLayer);
    if (clusterLayer) map.removeLayer(clusterLayer);

    if (data.serving_mode === "clusters") {
      renderClusters(data.clusters);
    } else {
      renderFeatures(data.features);
    }
  } catch (err) {
    console.error("Failed to load features:", err);
  } finally {
    isLoading = false;
  }
}

// --- Render clusters (v3) ---
function renderClusters(clusters) {
  clusterLayer = L.layerGroup();

  clusters.forEach((cell) => {
    const latlng = [cell.centroid_lat, cell.centroid_lon];
    const statusKeys = Object.keys(cell.statuses || {});
    const isMixed = statusKeys.length > 1;
    const isPlanned = statusKeys.length === 1 && statusKeys[0] === "planned";

    const className = isMixed
      ? "cluster-count mixed"
      : isPlanned
      ? "cluster-count planned"
      : "cluster-count";

    const marker = L.marker(latlng, {
      icon: L.divIcon({
        className: "",
        html: `<div class="${className}">${cell.count}</div>`,
        iconSize: [30, 30],
      }),
    });

    marker.bindPopup(`<b>${cell.count} road works</b>`);
    marker.addTo(clusterLayer);
  });

  clusterLayer.addTo(map);
}

// --- Render features (v3 + v2 behaviour) ---
function renderFeatures(features) {
  const geojson = toGeoJSON(features);
  const centerMarkers = [];

  featuresLayer = L.geoJSON(geojson, {
    style: (feature) => {
      const type = feature.geometry?.type;
      if (type === "LineString") return { color: "#ff6600", weight: 3 };
      if (type === "Polygon")
        return { color: "#3388ff", weight: 2, fillOpacity: 0.2 };
      return { color: "#3388ff" };
    },

    pointToLayer: (feature, latlng) =>
      L.marker(latlng, { icon: getIconFromFeature(feature) }),

    onEachFeature: (feature, layer) => {
      const p = feature.properties;

      const popup =
        `<b>${p.public_id}</b><br>` +
        `Status: ${p.status}<br>` +
        `TM: ${p.traffic_management_type || "—"}<br>` +
        `Live: ${p.is_live ? "Yes" : "No"}`;

      layer.bindPopup(popup);

      layer.on("click", () => showCallout(p.public_id));

      // Center marker for non-point geometries
      if (feature.geometry?.type !== "Point") {
        try {
          const center = layer.getBounds().getCenter();
          const marker = L.marker(center, {
            icon: getIconFromFeature(feature),
          })
            .bindPopup(popup)
            .on("click", () => showCallout(p.public_id));

          centerMarkers.push(marker);
        } catch {}
      }
    },
  }).addTo(map);

  centerMarkers.forEach((m) => m.addTo(map));
}

// --- Fetch timeline + show v2-style callout ---
async function showCallout(publicId) {
  calloutBody.innerHTML = "Loading…";

  try {
    const res = await fetch(`${API_BASE}/api/timeline/${publicId}`);
    const data = await res.json();

    const events = data.timeline || [];
    const latest = events[events.length - 1];
    const payload = latest?.payload || {};
    const entity = data.entity || {};

    const friendlyStart = entity.effective_from
      ? new Date(entity.effective_from).toLocaleString()
      : null;
    const friendlyEnd = entity.effective_to
      ? new Date(entity.effective_to).toLocaleString()
      : null;

    calloutBody.innerHTML = `
      <h2>${payload.promoter_organisation || publicId}</h2>
      <h3>${payload.traffic_management_type || "Road works"}</h3>

      <p>
        ${payload.work_category ? `<div><strong>Category:</strong> ${payload.work_category}</div>` : ""}
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

      <div><strong>Status:</strong> ${entity.status}</div>
      <div><strong>Live:</strong> ${entity.is_live ? "Yes" : "No"}</div>

      <hr/>

      <div><strong>Events:</strong> ${events.length}</div>
    `;
  } catch (err) {
    calloutBody.innerHTML = `<p>Error loading details: ${err.message}</p>`;
  }
}

// --- Debounced reload ---
let moveTimer = null;
map.on("moveend zoomend", () => {
  clearTimeout(moveTimer);
  moveTimer = setTimeout(loadFeatures, 300);
});

// --- Initial load ---
loadFeatures();

