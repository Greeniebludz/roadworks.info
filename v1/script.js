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
    road_closure: L.icon({
      iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
      shadowUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }),
    "road closure": L.icon({
      iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-black.png",
      shadowUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow-red.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }),

    multiway_signals: L.icon({
      iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
      shadowUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }),
    "multi-way signals": L.icon({
      iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
      shadowUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }),

    two_way_signals: L.icon({
      iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
      shadowUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }),
    "two-way signals": L.icon({
      iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
      shadowUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }),

    "some carriageway incursion": L.icon({
      iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
      shadowUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow-orange.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }),

    "give and take": L.icon({
      iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
      shadowUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow-red.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }),

    "lane closure": L.icon({
      iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png",
      shadowUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }),

    "no carriageway incursion": L.icon({
      iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
      shadowUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow-grey.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }),

    default: L.icon({
      iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png",
      shadowUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }),
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
  infoPanel.classList.remove("collapsed");

  const p = feature.properties || {};

  const locationType = p.works_location_type
    ? `<div><strong>Location Type:</strong> ${p.works_location_type}</div>`
    : "";

  const workCat = p.work_category
    ? `<div><strong>Work Category:</strong> ${p.work_category}</div>`
    : "";

  const street = p.street_name
    ? `<div><strong>Street:</strong> ${p.street_name}</div>`
    : "";

  const town = p.town
    ? `<div><strong>Town:</strong> ${p.town}</div>`
    : "";

  const ha = p.highway_authority
    ? `<div><strong>Highway Authority:</strong> ${p.highway_authority}</div>`
    : "";

  const permitRef = p.permit_reference_number
    ? `<div><strong>Permit Ref:</strong> ${p.permit_reference_number}</div>`
    : "";

  const permitStatus = p.permit_status
    ? `<div><strong>Permit Status:</strong> ${p.permit_status}</div>`
    : "";

  const friendlyStart = p.proposed_start_date
    ? new Date(p.proposed_start_date).toLocaleString()
    : null;

  const friendlyEnd = p.proposed_end_date
    ? new Date(p.proposed_end_date).toLocaleString()
    : null;

  panel.innerHTML = `
    <h2>${p.promoter_organisation || "Unknown Promoter"}</h2>

    <h3 style="margin-top:4px;">
      ${p.traffic_management_type || "Traffic Management"}
      <span style="color:#888; font-size:12px;">(what does this mean?)</span>
    </h3>

    <p>
      ${locationType}
      ${workCat ? `${workCat} <span style="color:#888; font-size:12px;">(what does this mean?)</span>` : ""}
    </p>

    <hr/>

    ${friendlyStart ? `<p><strong>Start:</strong> ${friendlyStart}</p>` : ""}
    ${friendlyEnd ? `<p><strong>End:</strong> ${friendlyEnd}</p>` : ""}

    <hr/>

    ${street}
    ${town}
    ${ha}

    <hr/>

    ${permitRef}
    ${permitStatus}
    ${p.work_status ? `<div><strong>Work Status:</strong> ${p.work_status}</div>` : ""}
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
document.getElementById("applyDateFilter").addEventListener("click", fetchVisibleRoadworks);

// --- EXTENTS TOGGLE ---
document.getElementById("showExtents").addEventListener("change", fetchVisibleRoadworks);

// --- MAP EVENTS ---
map.on("moveend", fetchVisibleRoadworks);
map.on("zoomend", fetchVisibleRoadworks);

// --- DEFAULT DATE = TODAY ---
function setDefaultToday() {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("filterStart").value = today;
  document.getElementById("filterEnd").value = today;
}
setDefaultToday();

// --- Callout collapse ---
const infoPanel = document.getElementById("infoPanel");
const collapseHandle = document.getElementById("infoCollapseHandle");

collapseHandle.addEventListener("click", () => {
  infoPanel.classList.toggle("collapsed");
});

// --- QUICK DATE PRESETS ---
function applyQuickRange(type) {
  const today = new Date();
  let start, end;

  if (type === "last14") {
    start = new Date(today.getTime() - 14 * 86400000);
    end = today;
  }

  if (type === "today") {
    start = today;
    end = today;
  }

  if (type === "next7") {
    start = today;
    end = new Date(today.getTime() + 7 * 86400000);
  }

  if (type === "next30") {
    start = today;
    end = new Date(today.getTime() + 30 * 86400000);
  }

  const fmt = d => d.toISOString().split("T")[0];

  document.getElementById("filterStart").value = fmt(start);
  document.getElementById("filterEnd").value = fmt(end);

  fetchVisibleRoadworks();
}

// --- QUICK BUTTON EVENTS ---
document.querySelectorAll("#quickButtons button").forEach(btn => {
  btn.addEventListener("click", () => {
    applyQuickRange(btn.dataset.range);
  });
});


// --- INITIAL LOAD ---
fetchVisibleRoadworks();
