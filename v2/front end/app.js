const API_BASE = "https://api.roadworks.info";
const MAPTILER_KEY = "84APRuB9gcvyT3xzXkKa";

/* Map */
const map = L.map("map").setView([51.4545, -0.9781], 12);
L.tileLayer(
  `https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`,
  { attribution: "&copy; MapTiler &copy; OpenStreetMap contributors" },
).addTo(map);

/* Icons */
const icons = {
  "two-way signals": L.icon({
    iconUrl: "/icons/tsa-icon.png",
    iconSize: [32, 32],
  }),
  "some carriageway incursion": L.icon({
    iconUrl: "/icons/c-icon.png",
    iconSize: [32, 32],
  }),
  "give and take": L.icon({
    iconUrl: "/icons/rwa-tbc-icon.png",
    iconSize: [32, 32],
  }),
  "lane closure": L.icon({
    iconUrl: "/icons/rwa-tbc-icon.png",
    iconSize: [32, 32],
  }),
  "no carriageway incursion": L.icon({
    iconUrl: "/icons/c-icon.png",
    iconSize: [32, 32],
  }),
  "road closure": L.icon({
    iconUrl: "/icons/road-closure-icon.png",
    iconSize: [32, 32],
  }),
};
const defaultIcon = L.icon({
  iconUrl: "/icons/c-icon.png",
  iconSize: [32, 32],
});

/* Sidebar callout */
const sidebarPanel = document.getElementById("sidebar-callout-details");
const sidebarBox = document.getElementById("info-callout");
const sidebarToggle = document.getElementById("callout-toggle");

sidebarBox.addEventListener("click", () => {
  const expanded = sidebarBox.classList.toggle("expanded");
  sidebarToggle.textContent = expanded ? "▲" : "▼";
});

/* Load features */
async function loadFeatures() {
  const bounds = map.getBounds();
  const params = new URLSearchParams({
    zoom: map.getZoom(),
    min_lon: bounds.getWest().toFixed(6),
    min_lat: bounds.getSouth().toFixed(6),
    max_lon: bounds.getEast().toFixed(6),
    max_lat: bounds.getNorth().toFixed(6),
  });

  const res = await fetch(`${API_BASE}/api/features?${params}`);
  const data = await res.json();

  if (window.featuresLayer) map.removeLayer(window.featuresLayer);
  if (window.clusterLayer) map.removeLayer(window.clusterLayer);

  if (data.serving_mode === "clusters") {
    renderClusters(data.clusters);
  } else {
    renderFeatures(data.features);
  }
}

/* Render clusters */
function renderClusters(clusters) {
  const layer = L.layerGroup();

  clusters.forEach((cell) => {
    const latlng = [cell.centroid_lat, cell.centroid_lon];
    const statusKeys = Object.keys(cell.statuses || {});
    const isMixed = statusKeys.length > 1;
    const isPlanned = statusKeys.length === 1 && statusKeys[0] === "planned";

    const className = isMixed
      ? "cluster-count mixed"
      : isPlanned
        ? "cluster-count planned"
        : "cluster-count";

    const marker = L.marker(latlng, {
      icon: L.divIcon({
        html: `<div class="${className}">${cell.count}</div>`,
        iconSize: [30, 30],
      }),
    });

    marker.addTo(layer);
  });

  window.clusterLayer = layer.addTo(map);
}

/* Render features */
function renderFeatures(features) {
  const geojson = {
    type: "FeatureCollection",
    features: features.map((f) => ({
      type: "Feature",
      geometry: f.geometry,
      properties: {
        public_id: f.public_id,
        status: f.status,
        is_live: f.is_live,
        effective_from: f.effective_from,
        effective_to: f.effective_to,
        tm: f.payload?.traffic_management_type,
        promoter: f.payload?.promoter_organisation,
        street: f.payload?.street_name,
        town: f.payload?.town,
        area: f.payload?.area_name,
        ha: f.payload?.highway_authority,
      },
    })),
  };

  const centerMarkers = [];

  const layer = L.geoJSON(geojson, {
    pointToLayer: (feature, latlng) =>
      L.marker(latlng, { icon: icons[feature.properties.tm] || defaultIcon }),

    onEachFeature: (feature, layer) => {
      const p = feature.properties;

      layer.on("click", () => {
        const id = p.public_id;
        if (id) showCallout(id);
      });

      if (feature.geometry.type !== "Point") {
        try {
          const center = layer.getBounds().getCenter();
          const marker = L.marker(center, {
            icon: icons[p.tm] || defaultIcon,
          }).on("click", () => showCallout(p.public_id));
          centerMarkers.push(marker);
        } catch {}
      }
    },
  }).addTo(map);

  centerMarkers.forEach((m) => m.addTo(map));
  window.featuresLayer = layer;
}

/* Callout */
async function showCallout(publicId) {
  sidebarPanel.innerHTML = "Loading…";

  const res = await fetch(`${API_BASE}/api/timeline/${publicId}`);
  const data = await res.json();

  const events = data.timeline || [];
  const latest = events[events.length - 1];
  const payload = latest?.payload || {};
  const ent = payload.entity || {};
  const entity = data.entity || {};

  const friendlyStart = entity.effective_from
    ? new Date(entity.effective_from).toLocaleString()
    : null;
  const friendlyEnd = entity.effective_to
    ? new Date(entity.effective_to).toLocaleString()
    : null;

  sidebarPanel.innerHTML = `
    <h2>${ent.promoter_organisation || publicId}</h2>
    <h3>${ent.traffic_management_type || "Road works"}</h3>

    ${ent.work_category ? `<div><strong>Category:</strong> ${ent.work_category}</div>` : ""}
    ${ent.activity_type ? `<div><strong>Activity:</strong> ${ent.activity_type}</div>` : ""}

    <hr/>

    ${friendlyStart ? `<div><strong>Start:</strong> ${friendlyStart}</div>` : ""}
    ${friendlyEnd ? `<div><strong>End:</strong> ${friendlyEnd}</div>` : ""}

    <hr/>

    ${ent.street_name ? `<div><strong>Street:</strong> ${ent.street_name}</div>` : ""}
    ${ent.town ? `<div><strong>Town:</strong> ${ent.town}</div>` : ""}
    ${ent.area_name ? `<div><strong>Area:</strong> ${ent.area_name}</div>` : ""}
    ${ent.highway_authority ? `<div><strong>Authority:</strong> ${ent.highway_authority}</div>` : ""}

    <hr/>

    <div><strong>Status:</strong> ${entity.status}</div>
    <div><strong>Live:</strong> ${entity.is_live ? "Yes" : "No"}</div>

    <hr/>

    <div><strong>Events:</strong> ${events.length}</div>
  `;
}

/* Reload on move */
let moveTimer = null;
map.on("moveend zoomend", () => {
  clearTimeout(moveTimer);
  moveTimer = setTimeout(loadFeatures, 300);
});

/* Initial load */
loadFeatures();
