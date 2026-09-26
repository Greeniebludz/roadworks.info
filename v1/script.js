// --- BASIC MAP ---
// 1. Create the map
const map = L.map('map').setView([51.5, -0.1], 12);

// 2. Add a tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19
}).addTo(map);

// --- PIN LAYER HOLDER ---
let pinsLayer = null;

// --- LOAD ROADWORKS ---
async function loadRoadworks() {
  try {
    const res = await fetch("https://roadworks.info/roadworks");
    const geo = await res.json();

    console.log("Loaded features:", geo.features.length);

    // Remove old layer
    if (pinsLayer) {
      map.removeLayer(pinsLayer);
    }

    // Create new layer
    pinsLayer = L.geoJSON(geo, {
      pointToLayer: (feature, latlng) => L.marker(latlng),
      onEachFeature: (feature, layer) => {
        const p = feature.properties || {};
        layer.bindPopup(`
  <div style="
    font-size:14px;
    line-height:1.5;
    padding:6px 4px;
    font-family:Arial, sans-serif;
  ">
    <div style="font-weight:bold; font-size:16px; margin-bottom:4px;">
      ${p.permit_status || p.work_status || "Unknown Status"}
    </div>

    <div><strong>Promoter:</strong> ${p.promoter_organisation || "Not provided"}</div>
    <div><strong>Traffic Management:</strong> ${p.traffic_management_type || "Not provided"}</div>
    <div><strong>Permit Ref:</strong> ${p.permit_reference_number || "Not provided"}</div>

    <hr style="margin:8px 0; border:none; border-top:1px solid #ccc;" />

    <div><strong>Start:</strong> ${p.proposed_start_date || "Not set"}</div>
    <div><strong>End:</strong> ${p.proposed_end_date || "Not set"}</div>
  </div>
`);

      }
    });

    // Only show pins if zoomed in enough
    if (map.getZoom() >= 10) {
      pinsLayer.addTo(map);
    }

  } catch (err) {
    console.error("Error loading roadworks:", err);
  }
}

// --- ZOOM GATE ---
map.on("zoomend", () => {
  if (!pinsLayer) return;

  const zoom = map.getZoom();

  if (zoom < 10) {
    map.removeLayer(pinsLayer);   // hide pins
  } else {
    pinsLayer.addTo(map);         // show pins
  }
});

// --- INITIAL LOAD ---
loadRoadworks();

// --- REFRESH EVERY 15 SECONDS ---
setInterval(loadRoadworks, 15000);
