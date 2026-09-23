// ⭐ IMPORTS
import { TM_ICONS } from "./icons/tmIcons.js";
import { UTILITY_ICONS } from "./icons/utilityIcons.js";
import { buildPinSVG } from "./icons/buildPinSVG.js";

const debug = document.getElementById("debug");
const statusFilter = document.getElementById("statusFilter");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
const quickRange = document.getElementById("quickRange");

const dataUrl = "https://geojson-worker.jamesgreen-928.workers.dev";

// ⭐ CLUSTER GROUP
const markers = L.markerClusterGroup({
  disableClusteringAtZoom: 11,
  maxClusterRadius: 40,
  spiderfyOnMaxZoom: true,
  removeOutsideVisibleBounds: true
});

// ⭐ DOT ICON
const dotIcon = L.divIcon({
  className: "dot-icon",
  iconSize: [8, 8]
});

// ⭐ TM ICON SET
const iconSet = {
  road_closure: L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  }),
  multi_way_signals: L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
    shadowUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  }),
  stop_go_boards: L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
    shadowUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  }),
  give_take: L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    shadowUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  }),
  lane_closure: L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
    shadowUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  }),
  default: L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
    shadowUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  })
};

// ⭐ POPUP FORMATTER
function formatPopup(item) {
  const start = item.start || 'N/A';
  const end = item.end || 'N/A';

  return `
    <div style="min-width:200px">
      <strong>${item.title}</strong><br/>
      <small>${item.status} • ${start} → ${end}</small>
      <hr style="margin:6px 0"/>
      <div>${item.description || ''}</div>

      <div style="margin-top:6px;font-size:12px;color:#555">
        USRN: ${item.usrn || 'N/A'}
      </div>
    </div>`;
}

// ⭐ LEGEND POPULATOR
function addLegendIcons() {
  const tmLegend = document.getElementById("tm-legend");
  const utilityLegend = document.getElementById("utility-legend");

  Object.entries(TM_ICONS).forEach(([key, svg]) => {
    const row = document.createElement("div");
    row.className = "legend-row";
    row.innerHTML = `
      <span class="legend-icon"><svg viewBox="0 0 16 16">${svg}</svg></span>
      ${formatLabel(key)}
    `;
    tmLegend.appendChild(row);
  });

  Object.entries(UTILITY_ICONS).forEach(([key, svg]) => {
    const row = document.createElement("div");
    row.className = "legend-row";
    row.innerHTML = `
      <span class="legend-icon"><svg viewBox="0 0 16 16">${svg}</svg></span>
      ${formatLabel(key)}
    `;
    utilityLegend.appendChild(row);
  });
}

function formatLabel(key) {
  return key.replace(/([A-Z])/g, " $1").replace(/^\w/, c => c.toUpperCase());
}

// ⭐ SM → POC MAPPER
function mapSMtoPOC(sm) {
  const o = sm.object_data || {};

  const tmRaw =
    o.current_traffic_management_type_ref ||
    o.traffic_management_type_ref ||
    o.traffic_management_type ||
    "";

  const tm = String(tmRaw).toLowerCase();

  let tmKey = "default";
  if (tm.includes("road_closure")) tmKey = "road_closure";
  else if (tm.includes("multi_way_signals")) tmKey = "multi_way_signals";
  else if (tm.includes("stop")) tmKey = "stop_go_boards";
  else if (tm.includes("give")) tmKey = "give_take";
  else if (tm.includes("lane")) tmKey = "lane_closure";

  return {
    id: o.permit_reference_number || sm.event_reference,
    title: `${o.street_name || "Unknown Street"} (${o.town || ""})`,
    status: o.work_status || "Unknown",
    start: o.actual_start_date_time || o.proposed_start_date,
    end: o.actual_end_date_time || o.proposed_end_date,
    lat: sm.lat,
    lon: sm.lon,
    description: `${o.work_category || ""} — ${o.traffic_management_type || ""}`,
    usrn: o.usrn || null,
    tmKey
  };
}

// ⭐ QUICK RANGE FILTER
function applyQuickRange(range) {
  const now = new Date();
  let start, end;

  if (range === "today") {
    start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    end = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  if (range === "week") {
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
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

  startDateInput.value = fmt(start);
  endDateInput.value = fmt(end);

  loadData();
}

// ⭐ LOAD DATA
function loadData() {
  markers.clearLayers();
  debug.textContent = "Loading…";

  fetch(dataUrl)
    .then(r => r.json())
    .then(raw => {
      const items = raw.features.map(f =>
        mapSMtoPOC({
          ...f.properties,
          lat: f.geometry.coordinates[1],
          lon: f.geometry.coordinates[0]
        })
      );

      const startDate = window._filterStart;
      const endDate = window._filterEnd;

      const filtered = items.filter(i => {
        if (!i.lat || !i.lon) return false;
        if (statusFilter.value && i.status !== statusFilter.value) return false;

        const start = i.start ? new Date(i.start) : null;
        const end = i.end ? new Date(i.end) : null;

        if (startDate && start && start < new Date(startDate)) return false;
        if (endDate && end && end > new Date(endDate)) return false;

        return true;
      });

      filtered.forEach(i => {
        const svg = buildPinSVG({
          severity: "medium",
          tmType: i.tmKey,
          utilityType: null
        });

        const icon = L.divIcon({
          html: svg,
          className: "gl-pin",
          iconSize: [32, 32],
          iconAnchor: [16, 26]
        });

        const m = L.marker([i.lat, i.lon], { icon });

        m.tmIcon = iconSet[i.tmKey] || iconSet.default;
        m.dotIcon = dotIcon;

        m.bindPopup(formatPopup(i));
        markers.addLayer(m);
      });

      map.addLayer(markers);

      debug.textContent = JSON.stringify(filtered, null, 2);

      if (filtered.length) {
        const group = L.featureGroup(
          filtered.map(i => L.marker([i.lat, i.lon]))
        );
        map.fitBounds(group.getBounds().pad(0.2));
      }
    })
    .catch(e => {
      debug.textContent = "Error loading data: " + e;
    });
}

// ⭐ ICON SWITCHING
map.on("zoomend", () => {
  const zoom = map.getZoom();

  markers.eachLayer(marker => {
    if (zoom >= 14) {
      marker.setIcon(marker.tmIcon);
    } else {
      marker.setIcon(marker.dotIcon);
    }
  });
});

// ⭐ EVENT LISTENERS
document.getElementById("loadDataBtn").addEventListener("click", loadData);
statusFilter.addEventListener("change", loadData);
startDateInput.addEventListener("change", loadData);
endDateInput.addEventListener("change", loadData);

quickRange.addEventListener("change", e => {
  applyQuickRange(e.target.value);
});

// ⭐ LEGEND
addLegendIcons();

// ⭐ INITIAL LOAD — TODAY
window.addEventListener("DOMContentLoaded", () => {
  applyQuickRange("today");
});
