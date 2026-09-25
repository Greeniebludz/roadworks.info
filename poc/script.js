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

fetch("https://xyzpxojfbjmnczqdbhxw.supabase.co/storage/v1/object/public/ha-boundaries/DABoundaries.json")
  .then(r => r.json())
  .then(geo => {
    L.geoJSON(geo, {
      style: {
        color: "#0057B8",
        weight: 2,
        fillOpacity: 0
      }
    }).addTo(haBoundariesLayer);
  });

haBoundariesLayer.addTo(map);

// --- ROADWORKS PINS ---
const roadworksLayer = L.layerGroup();

const DATA_URL = "https://sm-push-listener.jamesgreen-928.workers.dev/roadworks";

function loadPins() {
  fetch(DATA_URL)
    .then(r => r.json())
    .then(geojson => {
      const layer = L.geoJSON(geojson, {
        pointToLayer: (feature, latlng) => L.marker(latlng),
        onEachFeature: (feature, layer) => {
          const p = feature.properties || {};
          layer.bindPopup(`
            <div style="font-size:14px; line-height:1.4;">
              <strong style="font-size:16px;">${p.street_name || "Unknown street"}</strong><br/>
              ${p.town || ""}<br/><br/>

              <strong>Event:</strong> ${p.event_type || "-"}<br/>
              <strong>Status:</strong> ${p.work_status || "-"}<br/>
              <strong>Activity:</strong> ${p.activity_type || "-"}<br/>
              <strong>Category:</strong> ${p.work_category || "-"}<br/>
              <strong>TM Type:</strong> ${p.traffic_management_type || "-"}<br/>
              <strong>Promoter:</strong> ${p.promoter_organisation || "-"}<br/>
              <strong>Highway Authority:</strong> ${p.highway_authority || "-"}<br/><br/>

              <strong>Start:</strong> ${p.proposed_start_date || p.actual_start_date_time || "-"}<br/>
              <strong>End:</strong> ${p.proposed_end_date || p.actual_end_date_time || "-"}<br/><br/>

              <strong>Work Ref:</strong> ${p.work_reference_number || "-"}<br/>
              <strong>Permit Ref:</strong> ${p.permit_reference_number || "-"}<br/><br/>

              <strong>Traffic Sensitive:</strong> ${p.is_traffic_sensitive || "-"}<br/>
              <strong>TTRO Required:</strong> ${p.is_ttro_required || "-"}<br/>
              <strong>Footway Closed:</strong> ${p.close_footway || "-"}<br/>
            </div>
          `);
        }
      });

      roadworksLayer.clearLayers();
      roadworksLayer.addLayer(layer);
    })
    .catch(err => console.error("Error loading pins:", err));
}

loadPins();
roadworksLayer.addTo(map);

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
