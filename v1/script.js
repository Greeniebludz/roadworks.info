// --- MAP INIT ---
const map = L.map('map', {
  center: [51.5074, -0.1278],
  zoom: 10
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// --- GLOBALS ---
let pinsLayer = null;
let latestRequestId = 0;

// --- SAFE FETCH ---
async function safeFetchJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) return { type: "FeatureCollection", features: [] };
    return await response.json();
  } catch {
    return { type: "FeatureCollection", features: [] };
  }
}

// --- MAIN FETCH ---
async function fetchVisibleRoadworks() {
  const requestId = ++latestRequestId;

  const bounds = map.getBounds();
  const url = `https://roadworks.info/roadworks?minLon=${bounds.getWest()}&minLat=${bounds.getSouth()}&maxLon=${bounds.getEast()}&maxLat=${bounds.getNorth()}`;

  const geojson = await safeFetchJSON(url);
  if (requestId !== latestRequestId) return;

  if (pinsLayer) map.removeLayer(pinsLayer);

  // --- READ FILTERS ---
  const showExtents = document.getElementById("showExtents").checked;

  const userStart = document.getElementById("filterStart")?.value || null;
  const userEnd = document.getElementById("filterEnd")?.value || null;

  const startFilter = userStart ? new Date(userStart).getTime() : null;
  const endFilter = userEnd ? new Date(userEnd).getTime() : null;

  // --- FILTER ---
  const filteredFeatures = geojson.features.filter(f => {
    const p = f.properties || {};
    const geom = f.geometry;

    const workStart = p.proposed_start_date ? new Date(p.proposed_start_date).getTime() : null;
    const workEnd = p.proposed_end_date ? new Date(p.proposed_end_date).getTime() : null;

    if (startFilter || endFilter) {
      if (!workStart || !workEnd) return false;
      if (startFilter && endFilter && !(workStart <= endFilter && workEnd >= startFilter)) return false;
      if (startFilter && !endFilter && !(workEnd >= startFilter)) return false;
      if (!startFilter && endFilter && !(workStart <= endFilter)) return false;
    }

    if (!showExtents && (geom?.type === "LineString" || geom?.type === "Polygon")) {
      return false;
    }

    return true;
  });

  // --- ICONS ---
  const dotIcon = L.divIcon({
    className: "dot-icon",
    html: '<div style="background:#ff0000;border-radius:50%;width:100%;height:100%;"></div>',
    iconSize: [8, 8],
  });

  const iconSet = {
    road_closure: L.icon({ iconUrl: "...red.png", shadowUrl: "...shadow.png", iconSize: [25,41], iconAnchor: [12,41] }),
    default: L.icon({ iconUrl: "...grey.png", shadowUrl: "...shadow.png", iconSize: [25,41], iconAnchor: [12,41] })
  };

  // --- GEOJSON LAYER ---
  pinsLayer = L.geoJSON(
    { type: "FeatureCollection", features: filteredFeatures },
    {
      pointToLayer: (feature, latlng) => {
        const geom = feature.geometry;
        const zoom = map.getZoom();

        if (!showExtents && geom?.type !== "Point") return null;

        if (geom?.type === "LineString") {
          const coords = geom.coordinates;
          latlng = L.latLng(coords[Math.floor(coords.length / 2)][1], coords[Math.floor(coords.length / 2)][0]);
        }

        if (geom?.type === "Polygon") {
          const ring = geom.coordinates[0];
          const bounds = L.latLngBounds(ring.map(([lng, lat]) => [lat, lng]));
          latlng = bounds.getCenter();
        }

        if (zoom < 14) return L.marker(latlng, { icon: dotIcon });

        const tm = feature.properties?.traffic_management_type?.toLowerCase() || "";
        const icon = iconSet[tm] || iconSet.default;

        return L.marker(latlng, { icon });
      },

      onEachFeature: (feature, layer) => {
        const p = feature.properties || {};

        layer.on("click", () => {
          const panel = document.getElementById("infoPanel");
          panel.classList.remove("hidden");
          panel.innerHTML = `
            <h2>${p.promoter_organisation || "Unknown Promoter"}</h2>
            <p>${p.traffic_management_type || "Traffic Management"}</p>
            ${p.proposed_start_date ? `<p><strong>Start:</strong> ${new Date(p.proposed_start_date).toLocaleString()}</p>` : ""}
            ${p.proposed_end_date ? `<p><strong>End:</strong> ${new Date(p.proposed_end_date).toLocaleString()}</p>` : ""}
          `;
        });
      }
    }
  ).addTo(map);
}

// --- LAYERS PANEL TOGGLE ---
document.getElementById("layersButton").addEventListener("click", () => {
  document.getElementById("layersPanel").classList.toggle("hidden");
});

// --- EXTENTS TOGGLE ---
document.getElementById("showExtents").addEventListener("change", fetchVisibleRoadworks);

// --- MAP EVENTS ---
map.on("moveend", fetchVisibleRoadworks);
map.on("zoomend", fetchVisibleRoadworks);

// --- INITIAL LOAD ---
fetchVisibleRoadworks();
