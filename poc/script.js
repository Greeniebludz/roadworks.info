const MAPTILER_KEY = "YOUR_KEY_HERE";

// --- MAP SETUP ---
const map = L.map("map").setView([51.4, -0.7], 10);

// Basemap layers
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

// ⭐ Traffic Base Map (required for traffic overlays)
const trafficBase = L.tileLayer(
  `https://api.maptiler.com/maps/traffic/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`,
  { attribution: "&copy; MapTiler" }
);

// ⭐ Traffic overlays
const trafficFlow = L.tileLayer(
  `https://api.maptiler.com/tiles/traffic/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`,
  { attribution: "&copy; MapTiler" }
);

const trafficIncidents = L.tileLayer(
  `https://api.maptiler.com/tiles/traffic-incidents/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`,
  { attribution: "&copy; MapTiler" }
);

// HA boundaries
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

// Marker cluster
const markers = L.markerClusterGroup();
map.addLayer(markers);

// Layer control
L.control.layers(
  {
    "Streets": streets,
    "Traffic Base": trafficBase,
    "Satellite": satellite,
    "Hybrid": hybrid,
    "Terrain": terrain,
    "Dark": dark,
    "Light": light
  },
  {
    "Traffic Flow": trafficFlow,
    "Traffic Incidents": trafficIncidents,
    "Roadworks": markers,
    "HA Boundaries": haBoundariesLayer
  }
).addTo(map);

// Legend toggle
const legendBody = document.getElementById("gl-legend-body");
const legendToggle = document.getElementById("gl-legend-toggle");

legendToggle.addEventListener("click", () => {
  const hidden = legendBody.style.display === "none";
  legendBody.style.display = hidden ? "block" : "none";
  legendToggle.textContent = hidden ? "Hide" : "Show";
});

// Legend population
function buildLegendRows(container, items) {
  container.innerHTML = "";
  items.forEach(item => {
    const row = document.createElement("div");
    row.className = "legend-row";

    const swatch = document.createElement("span");
    swatch.className = "legend-colour";
    swatch.style.background = item.colour;

    const label = document.createElement("span");
    label.textContent = item.label;

    row.appendChild(swatch);
    row.appendChild(label);
    container.appendChild(row);
  });
}

buildLegendRows(document.getElementById("tm-legend"), [
  { label: "Lane closure", colour: "#FF9800" },
  { label: "Road closure", colour: "#D50000" },
  { label: "Two-way signals", colour: "#3F51B5" },
  { label: "Multi-way signals", colour: "#673AB7" }
]);

buildLegendRows(document.getElementById("utility-legend"), [
  { label: "BT / Openreach", colour: "#1976D2" },
  { label: "Virgin Media", colour: "#C2185B" },
  { label: "Water", colour: "#0288D1" },
  { label: "Gas", colour: "#FFA000" },
  { label: "Electric", colour: "#7B1FA2" }
]);

// Filters + quick range
const quickRangeEl = document.getElementById("quickRange");
const statusFilterEl = document.getElementById("statusFilter");
const startDateEl = document.getElementById("startDate");
const endDateEl = document.getElementById("endDate");
const loadDataBtn = document.getElementById("loadDataBtn");

window._filterStart = null;
window._filterEnd = null;

function applyQuickRange(range) {
  const now = new Date();
  let start, end;

  if (range === "today") {
    start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    end = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  } else if (range === "week") {
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    start = new Date(now.getFullYear(), now.getMonth(), diff);
    end = new Date(start);
    end.setDate(start.getDate() + 6);
  } else {
    start = new Date(now.getFullYear(), now.getMonth(), 1);
    end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  }

  const fmt = d => d.toISOString().split("T")[0];

  window._filterStart = fmt(start);
  window._filterEnd = fmt(end);

  startDateEl.value = fmt(start);
  endDateEl.value = fmt(end);

  loadData();
}

quickRangeEl.addEventListener("change", e => applyQuickRange(e.target.value));

// Data loading (stub)
const DATA_URL = "https://example.com/roadworks.geojson";

function logDebug(msg) {
  const ts = new Date().toISOString();
  const el = document.getElementById("debug");
  el.textContent += `[${ts}] ${msg}\n`;
  el.scrollTop = el.scrollHeight;
}

function loadData() {
  logDebug(`Loading data with filters: status=${statusFilterEl.value}, start=${window._filterStart}, end=${window._filterEnd}`);

  markers.clearLayers();

  fetch(DATA_URL)
    .then(r => r.json())
    .then(geojson => {
      const features = geojson.features || [];

      const filtered = features.filter(f => {
        const p = f.properties || {};
        if (statusFilterEl.value && p.status !== statusFilterEl.value) return false;
        if (window._filterStart && p.start_date < window._filterStart) return false;
        if (window._filterEnd && p.end_date > window._filterEnd) return false;
        return true;
      });

      const layer = L.geoJSON(filtered, {
        pointToLayer: (feature, latlng) => L.marker(latlng),
        onEachFeature: (feature, layer) => {
          const p = feature.properties || {};
          layer.bindPopup(`
            <strong>${p.description || "Roadworks"}</strong><br/>
            Status: ${p.status || "Unknown"}<br/>
            Start: ${p.start_date || "-"}<br/>
            End: ${p.end_date || "-"}
          `);
        }
      });

      markers.addLayer(layer);
      logDebug(`Loaded ${filtered.length} features`);
    })
    .catch(err => {
      console.error(err);
      logDebug(`Error loading data: ${err.message}`);
    });
}

applyQuickRange(quickRangeEl.value);
loadDataBtn.addEventListener("click", loadData);

// Geocoder
L.Control.geocoder({ defaultMarkGeocode: true })
  .on("markgeocode", e => map.fitBounds(e.geocode.bbox))
  .addTo(map);
