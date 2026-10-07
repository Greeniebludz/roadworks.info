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

// --- REQUEST TOKEN (prevents flicker) ---
let latestRequestId = 0;

// --- SAFE JSON FETCH ---
async function safeFetchJSON(url) {
  const res = await fetch(url);
  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch {
    console.error("Invalid JSON from Worker:", text);
    return { type: "FeatureCollection", features: [] };
  }
}

// --- FETCH ONLY VISIBLE AREA (with anti-flicker) ---
async function fetchVisibleRoadworks() {
  const requestId = ++latestRequestId;   // mark this request as newest

  const bounds = map.getBounds();

  const minLon = bounds.getWest();
  const minLat = bounds.getSouth();
  const maxLon = bounds.getEast();
  const maxLat = bounds.getNorth();

  const url = `https://roadworks.info/roadworks?minLon=${minLon}&minLat=${minLat}&maxLon=${maxLon}&maxLat=${maxLat}`;

  const geojson = await safeFetchJSON(url);

  // If a newer request has started, ignore this one
  if (requestId !== latestRequestId) {
    console.log("Ignoring stale response", requestId);
    return;
  }

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
<div style="margin-top:4px;"></div>
  ${p.works_location_type ? `<div><strong>Location Type:</strong> ${p.works_location_type}</div>` : ""}
      ${p.work_category ? `<div><strong>Work Category:</strong> ${p.work_category} <span style="color:#0077cc; font-size:12px;">(info)</span></div>` : ""}
    </div>
<hr style="margin:8px 0; border:none; border-top:1px solid #ccc;" />

!-- DATES -->
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
            `);
    }
  }).addTo(map);
}

// --- DEBOUNCE MOVEMENT ---
let debounceTimer = null;

function debouncedFetch() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(fetchVisibleRoadworks, 250);
}

// --- FETCH ON MOVE ---
map.on("moveend", debouncedFetch);

// --- FETCH ON ZOOM ---
map.on("zoomend", debouncedFetch);

// --- INITIAL LOAD ---
fetchVisibleRoadworks();
