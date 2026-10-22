const API_BASE = "https://search.roadworks.info"; // features + search
const TIMELINE_BASE = "https://api.roadworks.info"; // timeline (old Worker)

const MAPTILER_KEY = "84APRuB9gcvyT3xzXkKa";

/* Map */
const map = L.map("map").setView([51.4545, -0.9781], 12);
L.tileLayer(
  `https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`,
  {
    detectRetina: false,
    useCache: true,
    cacheMaxAge: 86400, // 24 hours
    attribution: "&copy; MapTiler &copy; OpenStreetMap contributors",
  },
).addTo(map);

/*Seachbar*/
const SEARCH_BASE = "https://search.roadworks.info";

let searchTimer = null;

document.getElementById("searchInput").addEventListener("input", (e) => {
  clearTimeout(searchTimer);
  const q = e.target.value.trim();

  if (q.length < 2) {
    document.getElementById("searchResults").innerHTML = "";
    return;
  }

  searchTimer = setTimeout(async () => {
    const res = await fetch(
      `${SEARCH_BASE}/api/search?q=${encodeURIComponent(q)}&limit=10`,
    );
    const data = await res.json();
    const container = document.getElementById("searchResults");

    if (!data.results || data.results.length === 0) {
      container.innerHTML = "<div>No results found</div>";
      return;
    }

    container.innerHTML = data.results
      .map(
        (r) => `
      <div class="search-result" data-lon="${r.rep_lon}" data-lat="${r.rep_lat}" data-id="${r.permit_reference}">
        <strong>${r.street_name || "Unknown street"}</strong>
        ${r.town ? `<br/>${r.town}` : ""}
        ${r.area_name ? `<br/>${r.area_name}` : ""}
        <br/><small>${r.permit_reference}</small>
      </div>`,
      )
      .join("");

    // Click handler for each result
    container.querySelectorAll(".search-result").forEach((el) => {
      el.addEventListener("click", () => {
        const lon = parseFloat(el.dataset.lon);
        const lat = parseFloat(el.dataset.lat);
        const id = el.dataset.id;

        // Center the map on the result
        map.setView([lat, lon], 16);

        // Clear search
        document.getElementById("searchResults").innerHTML = "";
        document.getElementById("searchInput").value = "";

        // Optionally trigger the popout by calling the timeline endpoint
        // showPopout(id);
      });
      el.style.cursor = "pointer";
    });
  }, 300);
});

/* Icons */
function getIcon(tm) {
  const key = (tm || "").toLowerCase();
  return icons[key] || defaultIcon;
}

const icons = {
  "two-way signals": L.icon({
    iconUrl: "/icons/tsa-icon.png",
    iconSize: [48, 48],
  }),
  "some carriageway incursion": L.icon({
    iconUrl: "/icons/c-icon.png",
    iconSize: [48, 48],
  }),
  "give and take": L.icon({
    iconUrl: "/icons/rwa-tbc-icon.png",
    iconSize: [48, 48],
  }),
  "lane closure": L.icon({
    iconUrl: "/icons/rwa-tbc-icon.png",
    iconSize: [48, 48],
  }),
  "no carriageway incursion": L.icon({
    iconUrl: "/icons/c-icon.png",
    iconSize: [48, 48],
  }),
  "road closure": L.icon({
    iconUrl: "/icons/ne-icon.png",
    iconSize: [48, 48],
  }),
  "multi-way signals": L.icon({
    iconUrl: "/icons/tsa-icon.png",
    iconSize: [48, 48],
  }),
  "stop/go boards": L.icon({
    iconUrl: "/icons/c-icon.png",
    iconSize: [48, 48],
  }),
  "temp obstruction 15 minute delay": L.icon({
    iconUrl: "/icons/ws-icon.png",
    iconSize: [48, 48],
  }),
  "priority working": L.icon({
    iconUrl: "/icons/c-icon.png",
    iconSize: [48, 48],
  }),
  "contra-flow": L.icon({ iconUrl: "/icons/c-icon.png", iconSize: [48, 48] }),
  "convoy workings": L.icon({
    iconUrl: "/icons/c-icon.png",
    iconSize: [48, 48],
  }),
};
const defaultIcon = L.icon({
  iconUrl: "/icons/c-icon.png",
  iconSize: [32, 32],
});
function setDateRange(from, to) {
  document.getElementById("dateFrom").value = from;
  document.getElementById("dateTo").value = to;
  loadFeatures();
}

document.getElementById("quickToday").addEventListener("click", () => {
  const today = new Date().toISOString().split("T")[0];
  setDateRange(today, today);
});

document.getElementById("quickLastWeek").addEventListener("click", () => {
  const today = new Date();
  const lastWeekStart = new Date(today);
  lastWeekStart.setDate(today.getDate() - 7);

  const from = lastWeekStart.toISOString().split("T")[0];
  const to = today.toISOString().split("T")[0];

  setDateRange(from, to);
});

document.getElementById("quickThisWeek").addEventListener("click", () => {
  const today = new Date();
  const day = today.getDay(); // 0 = Sunday
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((day + 6) % 7));

  const from = monday.toISOString().split("T")[0];
  const to = today.toISOString().split("T")[0];

  setDateRange(from, to);
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

  // Read date inputs
  const from = document.getElementById("dateFrom")?.value || "";
  const to = document.getElementById("dateTo")?.value || "";

  // Build date query params
  let dateParam = "";
  if (from) dateParam += `&from=${encodeURIComponent(from)}`;
  if (to) dateParam += `&to=${encodeURIComponent(to)}`;

  // Build bbox + zoom params
  const params = new URLSearchParams({
    zoom: map.getZoom(),
    min_lon: bounds.getWest().toFixed(6),
    min_lat: bounds.getSouth().toFixed(6),
    max_lon: bounds.getEast().toFixed(6),
    max_lat: bounds.getNorth().toFixed(6),
  });

  // Fetch with date filters included
  const res = await fetch(`${API_BASE}/api/features?${params}${dateParam}`);
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
        public_id: f.source_id,
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
      L.marker(latlng, { icon: getIcon(feature.properties.tm) }),

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
            icon: getIcon(p.tm),
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
  /* Auto-expand the callout so the user sees the content */
  if (sidebarBox && !sidebarBox.classList.contains("expanded")) {
    sidebarBox.classList.add("expanded");
    if (sidebarToggle) sidebarToggle.textContent = "▲";
  }

  sidebarPanel.innerHTML = "Loading…";

  /* ... rest of the function ... */

  const res = await fetch(`${TIMELINE_BASE}/api/timeline/${publicId}`);
  const data = await res.json();

  const events = data.timeline || [];
  const latest = events[events.length - 1];
  const rawPayload = latest?.payload || {};
  const parsed =
    typeof rawPayload === "string" ? JSON.parse(rawPayload) : rawPayload;
  const ent = parsed.object_data || parsed || {};

  const entity = data.entity || {};

  const friendlyStart = entity.effective_from
    ? new Date(entity.effective_from).toLocaleString()
    : null;
  const friendlyEnd = entity.effective_to
    ? new Date(entity.effective_to).toLocaleString()
    : null;

  sidebarPanel.innerHTML = `
    <p> Who is responsible for this work? <p>  
    <h2>🦺${ent.promoter_organisation || publicId}🦺</h2>
    <p> <i> How to contact the responsible promotor <i> <p>
    <h3>🚦Traffic management: ${ent.traffic_management_type || "Road works"}</h3>
    <p> <i> What does this traffic management mean? <i> <p>

    <hr/>
    <p> When is this work happening? <p>
    ${friendlyStart ? `<div>🕒<strong>Start:</strong> ${friendlyStart}</div>` : ""}
    ${friendlyEnd ? `<div>🕒<strong>End:</strong> ${friendlyEnd}</div>` : ""}
    <p> <i> The start and end dates can change. <i> <p>

    <hr/>

    ${ent.street_name ? `<div><strong>Street:</strong> ${ent.street_name}</div>` : ""}
    ${ent.town ? `<div><strong>Town:</strong> ${ent.town}</div>` : ""}
    ${ent.area_name ? `<div><strong>Area:</strong> ${ent.area_name}</div>` : ""}
    ${ent.highway_authority ? `<div><strong>Authority:</strong> ${ent.highway_authority}</div>` : ""}

    <hr/>

    <div><strong>Status:</strong> ${entity.status}</div>
    <div><strong>Live:</strong> ${entity.is_live ? "Yes" : "No"}</div>

    <hr/>

    <div><strong>Permit reference:</strong> ${publicId}</div>
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
document.getElementById("dateFrom").addEventListener("change", loadFeatures);
document.getElementById("dateTo").addEventListener("change", loadFeatures);
