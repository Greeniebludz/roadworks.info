// --- BASIC MAP ---
const map = L.map('map').setView([51.5, -0.1], 12);

// Tile layer
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

  // Existing fields
  const promoter = p.promoter_organisation ? `<div><strong>Promoter:</strong> ${p.promoter_organisation}</div>` : "";
  const tm = p.traffic_management_type ? `<div><strong>Traffic Management:</strong> ${p.traffic_management_type}</div>` : "";
  const permitRef = p.permit_reference_number ? `<div><strong>Permit Ref:</strong> ${p.permit_reference_number}</div>` : "";
  const start = p.proposed_start_date ? `<div><strong>Start:</strong> ${p.proposed_start_date}</div>` : "";
  const end = p.proposed_end_date ? `<div><strong>End:</strong> ${p.proposed_end_date}</div>` : "";

  // ⭐ NEW FIELDS
  const street = p.street_name ? `<div><strong>Street:</strong> ${p.street_name}</div>` : "";
  const town = p.town ? `<div><strong>Town:</strong> ${p.town}</div>` : "";
  const ha = p.highway_authority ? `<div><strong>Highway Authority:</strong> ${p.highway_authority}</div>` : "";
  const activity = p.activity_type ? `<div><strong>Activity:</strong> ${p.activity_type}</div>` : "";
  const workCat = p.work_category ? `<div><strong>Work Category:</strong> ${p.work_category}</div>` : "";
  const roadCat = p.road_category ? `<div><strong>Road Category:</strong> ${p.road_category}</div>` : "";
  const permitStatus = p.work_status ? `<div><strong>work_status:</strong> ${p.work_status}</div>` : "";
  const locationType = p.works_location_type ? `<div><strong>Location Type:</strong> ${p.works_location_type}</div>` : "";

const title = `
  <div style="font-weight:bold; font-size:16px; margin-bottom:6px;">
    ${p.activity_type || "Roadworks"}
    ${p.work_status ? ` – ${p.work_status}` : ""}
  </div>
`;

layer.bindPopup(`
  <div style="font-size:14px; line-height:1.5; padding:6px;">

    <!-- HEADER -->
    <div style="font-weight:bold; font-size:16px; margin-bottom:6px;">
      ${p.promoter_organisation || "Unknown Promoter"}
    </div>

    <!-- TITLE -->
    <div style="font-size:15px; font-weight:bold;">
      ${p.traffic_management_type || "Traffic Management"}
      <span style="color:#0077cc; font-size:12px;">(what does this mean?)</span>
    </div>

    <!-- SUB TEXT -->
    <div style="margin-top:4px;">
      ${p.works_location_type ? `<div><strong>Location Type:</strong> ${p.works_location_type}</div>` : ""}
      ${p.work_category ? `<div><strong>Work Category:</strong> ${p.work_category} <span style="color:#0077cc; font-size:12px;">(info)</span></div>` : ""}
    </div>

    <hr style="margin:8px 0; border:none; border-top:1px solid #ccc;" />

    <!-- DATES -->
    <div>
      ${p.proposed_start_date ? `<div><strong>Start:</strong> ${new Date(p.proposed_start_date).toLocaleString()}</div>` : ""}
      ${p.proposed_end_date ? `<div><strong>End:</strong> ${new Date(p.proposed_end_date).toLocaleString()}</div>` : ""}
    </div>

    <hr style="margin:8px 0; border:none; border-top:1px solid #ccc;" />

    <!-- LOCATION -->
    <div>
      ${p.street_name ? `<div><strong>Street:</strong> ${p.street_name}</div>` : ""}
      ${p.town ? `<div><strong>Town:</strong> ${p.town}</div>` : ""}
      ${p.highway_authority ? `<div><strong>Highway Authority:</strong> ${p.highway_authority}</div>` : ""}
    </div>

    <hr style="margin:8px 0; border:none; border-top:1px solid #ccc;" />

    <!-- PERMIT DETAILS -->
    <div>
      ${p.permit_reference_number ? `<div><strong>Permit Ref:</strong> ${p.permit_reference_number}</div>` : ""}
      ${p.permit_status ? `<div><strong>Permit Status:</strong> ${p.permit_status}</div>` : ""}
      ${p.work_status ? `<div><strong>Work Status:</strong> ${p.work_status}</div>` : ""}
    </div>

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
    map.removeLayer(pinsLayer);
  } else {
    pinsLayer.addTo(map);
  }
});

// --- INITIAL LOAD ---
loadRoadworks();

// --- REFRESH EVERY 15 SECONDS ---
setInterval(loadRoadworks, 15000);
