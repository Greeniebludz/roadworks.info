const MAPTILER_KEY = "84APRuB9gcvyT3xzXkKa";

// --- MAP SETUP ---
const map = L.map("map").setView([51.4, -0.7], 10);

// --- BASEMAPS ---
const streets = L.tileLayer(
  `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`,
  { attribution: "&copy; MapTiler" }
).addTo(map);

const satellite = L.tileLayer(
  `https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=${MAPTILER_KEY}`,
  { attribution: "&copy; MapTiler" }
);

const hybrid = L.tileLayer(
  `https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=${MAPTILER_KEY}`,
  { attribution: "&copy; MapTiler" }
);

const terrain = L.tileLayer(
  `https://api.maptiler.com/maps/terrain/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`,
  { attribution: "&copy; MapTiler" }
);

const dark = L.tileLayer(
  `https://api.maptiler.com/maps/darkmatter/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`,
  { attribution: "&copy; MapTiler" }
);

const light = L.tileLayer(
  `https://api.maptiler.com/maps/positron/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`,
  { attribution: "&copy; MapTiler" }
);

// --- TRAFFIC LAYERS ---
const trafficBase = L.tileLayer(
  `https://api.maptiler.com/maps/traffic/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`,
  { attribution: "&copy; MapTiler" }
);

const trafficFlow = L.tileLayer(
  `https://api.maptiler.com/tiles/traffic/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`,
  { attribution: "&copy; MapTiler" }
);

const trafficIncidents = L.tileLayer(
  `https://api.maptiler.com/tiles/traffic-incidents/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`,
  { attribution: "&copy; MapTiler" }
);

// --- HA BOUNDARIES ---
const haBoundariesLayer = L.layerGroup();
L.geoJSON({
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [[
      [-0.9, 51.5],
      [-0.7, 51.5],
      [-0.7, 51.4],
      [-0.9, 51.4],
      [-0.9, 51.5]
    ]]
  }
}, {
  style: { color: "#0057B8", weight: 2, fillOpacity: 0.1 }
}).addTo(haBoundariesLayer);

// --- ROADWORKS PINS ---
const roadworksLayer = L.layerGroup();

// Load pins
const DATA_URL = "https://sm-push-listener.jamesgreen-928.workers.dev/roadworks";

function loadPins() {
  fetch(DATA_URL)
    .then(r => r.json())
    .then(geojson => {
      L.geoJSON(geojson, {
        pointToLayer: (feature, latlng) => L.marker(latlng),
        onEachFeature: (feature, layer) => {
          const p = feature.properties || {};
          layer.bindPopup(`
            <strong>${p.street_name || "Unknown street"}</strong><br/>
            ${p.town || ""}<br/>
            <strong>Status:</strong> ${p.work_status || "Unknown"}<br/>
            <strong>Promoter:</strong> ${p.promoter_organisation || "-"}<br/>
            <strong>TM:</strong> ${p.traffic_management_type || "-"}<br/>
            <strong>Start:</strong> ${p.proposed_start_date || "-"}<br/>
            <strong>End:</strong> ${p.proposed_end_date || "-"}<br/>
            <strong>Ref:</strong> ${p.work_reference_number || p.permit_reference_number || "-"}
          `);
        }
      }).addTo(roadworksLayer);
    })
    .catch(err => console.error("Error loading pins:", err));
}

loadPins();

// --- LAYER CONTROL ---
L.control.layers(
  {
    "Streets": streets,
    "Satellite": satellite,
    "Hybrid": hybrid,
    "Terrain": terrain,
    "Dark": dark,
    "Light": light,
    "Traffic Base": trafficBase
  },
  {
    "Roadworks": roadworksLayer,
    "Traffic Flow": trafficFlow,
    "Traffic Incidents": trafficIncidents,
    "HA Boundaries": haBoundariesLayer
  }
).addTo(map);
