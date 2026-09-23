// --- GLOBALS ---
const debugEl = document.getElementById("debug");

// Marker cluster for roadworks
const markers = L.markerClusterGroup();

// Attach to map immediately so layer control can see it
if (window.map && typeof window.map.addLayer === "function") {
  window.map.addLayer(markers);
} else {
  console.error("Map is not ready when script.js ran");
}

// --- LAYER CONTROL SETUP ---
const baseLayers = {
  "OpenStreetMap": window.osm
};

const overlays = {
  "Roadworks": markers,
  "HA Boundaries": window.haBoundariesLayer,
  "Google Traffic": window.googleTraffic
};

L.control.layers(baseLayers, overlays).addTo(window.map);

// --- LEGEND POPULATION ---
const tmLegendEl = document.getElementById("tm-legend");
const utilityLegendEl = document.getElementById("utility-legend");

const trafficManagementTypes = [
  { label: "Lane closure", colour: "#FF9800" },
  { label: "Road closure", colour: "#D50000" },
  { label: "Two-way signals", colour: "#3F51B5" },
  { label: "Multi-way signals", colour: "#673AB7" }
];

const utilityProviders = [
  { label: "BT / Openreach", colour: "#1976D2" },
  { label: "Virgin Media", colour: "#C2185B" },
  { label: "Water", colour: "#0288D1" },
  { label: "Gas", colour: "#FFA000" },
  { label: "Electric", colour: "#7B1FA2" }
];

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

buildLegendRows(tmLegendEl, trafficManagementTypes);
buildLegendRows(utilityLegendEl, utilityProviders);

// --- COLLAPSIBLE LEGEND ---
const legendBody = document.getElementById("gl-legend-body");
const legendToggle = document.getElementById("gl-legend-toggle");

legendToggle.addEventListener("click", () => {
  const isHidden = legendBody.style.display === "none";
  legendBody.style.display = isHidden ? "block" : "none";
  legendToggle.textContent = isHidden ? "Hide" : "Show";
});

// --- FILTERS + QUICK RANGE ---
const quickRangeEl = document.getElementById("quickRange");
const statusFilterEl = document.getElementById("statusFilter");
const startDateEl = document.getElementById("startDate");
const endDateEl = document.getElementById("endDate");
const loadDataBtn = document.getElementById("loadDataBtn");

// Internal filter values
window._filterStart = null;
window._filterEnd = null;

function applyQuickRange(range) {
  const now = new Date();
  let start, end;

  if (range === "today") {
    start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    end = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  if (range === "week") {
    const day = now.getDay(); // 0 = Sunday
    const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Monday start
    start = new Date(now.getFullYear(), now.getMonth(), diff);
    end = new Date(start);
    end.setDate(start.getDate() + 6);
  }

  if (range === "month") {
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

quickRangeEl.addEventListener("change", e => {
  applyQuickRange(e.target.value);
});

// --- DATA LOADING (stubbed; replace URL with your Worker) ---
const DATA_URL = "https://example.com/roadworks.geojson"; // TODO: your real endpoint

function logDebug(msg) {
  const ts = new Date().toISOString();
  debugEl.textContent += `[${ts}] ${msg}\n`;
  debugEl.scrollTop = debugEl.scrollHeight;
}

function loadData() {
  logDebug(`Loading data with filters: status=${statusFilterEl.value}, start=${window._filterStart}, end=${window._filterEnd}`);

  // Clear existing markers
  markers.clearLayers();

  fetch(DATA_URL)
    .then(r => r.json())
    .then(geojson => {
      const features = geojson.features || [];

      const filtered = features.filter(f => {
        const props = f.properties || {};
        const status = props.status || "";
        const startDate = props.start_date || null;
        const endDate = props.end_date || null;

        if (statusFilterEl.value && status !== statusFilterEl.value) {
          return false;
        }

        if (window._filterStart && startDate && startDate < window._filterStart) {
          return false;
        }
        if (window._filterEnd && endDate && endDate > window._filterEnd) {
          return false;
        }

        return true;
      });

      const layer = L.geoJSON(filtered, {
        pointToLayer: (feature, latlng) => L.marker(latlng),
        onEachFeature: (feature, layer) => {
          const p = feature.properties || {};
          const html = `
            <strong>${p.description || "Roadworks"}</strong><br/>
            Status: ${p.status || "Unknown"}<br/>
            Start: ${p.start_date || "-"}<br/>
            End: ${p.end_date || "-"}
          `;
          layer.bindPopup(html);
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

// Initial quick range + load
applyQuickRange(quickRangeEl.value);

// Reload button
loadDataBtn.addEventListener("click", () => {
  loadData();
});
