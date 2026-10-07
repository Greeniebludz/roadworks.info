// --- BASIC MAP ---
const map = L.map('map').setView([51.5, -0.1], 12);

// Tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19
}).addTo(map);

// --- SEARCH BOX ---
L.Control.geocoder({
  defaultMarkGeocode: true
}).addTo(map);

// --- PIN LAYER HOLDER ---
let pinsLayer = null;

// --- FETCH ONLY VISIBLE AREA ---
async function fetchVisibleRoadworks() {
  const bounds = map.getBounds();

  const minLon = bounds.getWest();
  const minLat = bounds.getSouth();
  const maxLon = bounds.getEast();
  const maxLat = bounds.getNorth();

  const url = `https://roadworks.info/roadworks?minLon=${minLon}&minLat=${minLat}&maxLon=${maxLon}&maxLat=${maxLat}`;

  const res = await fetch(url);
  const geojson = await res.json();

  console.log("Loaded features:", geojson.features.length);

  // Remove old layer
  if (pinsLayer) {
    map.removeLayer(pinsLayer);
  }

  // Add new layer
  pinsLayer = L.geoJSON(geojson, {
    pointToLayer: (feature, latlng) => L.marker(latlng),
    onEachFeature: (feature, layer) => {
      const p = feature.properties || {};

      const promoter = p.promoter_organisation ? `<div><strong>Promoter:</strong> ${p.promoter_organisation}</div>` : "";
      const tm = p.traffic_management_type ? `<div><strong>Traffic Management:</strong> ${p.traffic_management_type}</div>` : "";
      const permitRef = p.permit_reference_number ? `<div><strong>Permit Ref:</strong> ${p.permit_reference_number}</div>` : "";
      const start = p.proposed_start_date ? `<div><strong>Start:</strong> ${new Date(p.proposed_start_date).toLocaleString()}</div>` : "";
      const end = p.proposed_end_date ? `<div><strong>End:</strong> ${new Date(p.proposed_end_date).toLocaleString()}</div>` : "";

      const street = p.street_name ? `<div><strong>Street:</strong> ${p.street_name}</div>` : "";
      const town = p.town ? `<div><strong>Town:</strong> ${p.town}</div>` : "";
      const ha = p.highway_authority ? `<div><strong>Highway Authority:</strong> ${p.highway_authority}</div>` : "";
      const activity = p.activity_type ? `<div><strong>Activity:</strong> ${p.activity_type}</div>` : "";
      const workCat = p.work_category ? `<div><strong>Work Category:</strong> ${p.work_category}</div>` : "";
      const roadCat = p.road_category ? `<div><strong>Road Category:</strong> ${p.road_category}</div>` : "";
      const permitStatus = p.work_status ? `<div><strong>Work Status:</strong> ${p.work_status}</div>` : "";
      const locationType = p.works_location_type ? `<div><strong>Location Type:</strong> ${p.works_location_type}</div>` : "";

      layer.bindPopup(`
        <div style="font-size:14px; line-height:1.5; padding:6px;">
          <div style="font-weight:bold; font-size:16px; margin-bottom:6px;">
            ${p.promoter_organisation || "Unknown Promoter"}
          </div>

          <div style="font-size:15px; font-weight:bold;">
            ${p.traffic_management_type || "Traffic Management"}
          </div>

          ${street}${town}${ha}${activity}${workCat}${roadCat}${permitStatus}${locationType}
          ${start}${end}
        </div>
      `);
    }
  }).addTo(map);
}

// --- FETCH ON MOVE ---
map.on("moveend", fetchVisibleRoadworks);

// --- FETCH ON ZOOM ---
map.on("zoomend", fetchVisibleRoadworks);

// --- INITIAL LOAD ---
fetchVisibleRoadworks();
