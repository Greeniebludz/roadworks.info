// --- BASIC MAP ---
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

// --- SAFE FETCH WITH ERROR HANDLING ---
async function safeFetchJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Fetch failed: ${response.status}`);
      return { type: "FeatureCollection", features: [] };
    }
    return await response.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return { type: "FeatureCollection", features: [] };
  }
}

async function fetchVisibleRoadworks() {
  const requestId = ++latestRequestId;

  const bounds = map.getBounds();
  const minLon = bounds.getWest();
  const minLat = bounds.getSouth();
  const maxLon = bounds.getEast();
  const maxLat = bounds.getNorth();

  const url = `https://roadworks.info/roadworks?minLon=${minLon}&minLat=${minLat}&maxLon=${maxLon}&maxLat=${maxLat}`;
  console.log("Fetching:", url);

  const geojson = await safeFetchJSON(url);

  if (requestId !== latestRequestId) {
    console.log("Ignoring stale response", requestId);
    return;
  }

  console.log("Loaded features:", geojson.features.length);

  if (pinsLayer) {
    map.removeLayer(pinsLayer);
  }

  // --- READ DATE FILTERS ---
  const userStart = document.getElementById("filterStart").value;
  const userEnd = document.getElementById("filterEnd").value;

  const startFilter = userStart ? new Date(userStart).getTime() : null;
  const endFilter = userEnd ? new Date(userEnd).getTime() : null;

  // --- FILTER FEATURES BY DATE ---
  const filteredFeatures = geojson.features.filter(f => {
    const p = f.properties;

    const workStart = p.proposed_start_date ? new Date(p.proposed_start_date).getTime() : null;
    const workEnd = p.proposed_end_date ? new Date(p.proposed_end_date).getTime() : null;

    // If user didn't pick dates → include everything
    if (!startFilter && !endFilter) return true;

    // If work has no dates → exclude
    if (!workStart || !workEnd) return false;

    // Overlap rule
    return workStart <= endFilter && workEnd >= startFilter;
  });

  console.log("Filtered features:", filteredFeatures.length);

  // --- DOT ICON ---
  const dotIcon = L.divIcon({
    className: "dot-icon",
    html: '<div style="background-color: #ff0000; border-radius: 50%; border: 2px solid #fff; width: 100%; height: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);"></div>',
    iconSize: [8, 8],
  });

  // --- TM ICON SET ---
  const iconSet = {
    road_closure: L.icon({
      iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
      shadowUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }),
    "road closure": L.icon({
      iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
      shadowUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png",
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
      iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
      shadowUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }),

    two_way_signals: L.icon({
      iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
      shadowUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }),
    "two-way signals": L.icon({
      iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
      shadowUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }),

    stop_go_boards: L.icon({
      iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
      shadowUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }),

    "give and take": L.icon({
      iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
      shadowUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }),

    "lane closure": L.icon({
      iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png",
      shadowUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png",
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

  // --- ADD FILTERED LAYER ---
  pinsLayer = L.geoJSON(
    { type: "FeatureCollection", features: filteredFeatures },
    {
      pointToLayer: (feature, latlng) => {
        const zoom = map.getZoom();

        if (zoom < 14) {
          return L.marker(latlng, { icon: dotIcon });
        }

        const tm = feature.properties?.traffic_management_type || "";
        const key = tm.toLowerCase();
        const icon = iconSet[key] || iconSet.default;

        return L.marker(latlng, { icon });
      },

      onEachFeature: (feature, layer) => {
        const p = feature.properties || {};
       

        layer.bindPopup(`
          <div style="font-size:14px; line-height:1.5; padding:6px;">
            <div style="font-weight:bold; font-size:16px; margin-bottom:6px;">
              ${p.promoter_organisation || "Unknown Promoter"}
            </div>

            <div style="font-size:15px; font-weight:bold;">
              ${p.traffic_management_type || "Traffic Management"}
            </div>

            ${p.proposed_start_date ? `<div><strong>Start:</strong> ${new Date(p.proposed_start_date).toLocaleString()}</div>` : ""}
            ${p.proposed_end_date ? `<div><strong>End:</strong> ${new Date(p.proposed_end_date).toLocaleString()}</div>` : ""}
          </div>
        `);

        const tm = p.traffic_management_type || "";
        const key = tm.toLowerCase();
        const icon = iconSet[key] || iconSet.default;

        pointToLayer: (feature, latlng) => {
  const zoom = map.getZoom();
  const geom = feature.geometry;
  const tm = feature.properties?.traffic_management_type || "";
  const key = tm.toLowerCase();
  const icon = iconSet[key] || iconSet.default;
  const dotIconToUse = zoom < 14 ? dotIcon : icon;

  // For LineString, use midpoint
  if (geom.type === "LineString") {
    const coords = geom.coordinates;
    const midpoint = coords[Math.floor(coords.length / 2)];
    latlng = L.latLng(midpoint[1], midpoint[0]);
  }
  // For Polygon, use centroid (calculated by Leaflet)
  // latlng is already the center for polygons

  return L.marker(latlng, { icon: dotIconToUse });
},
    }
  ).addTo(map);
}

// --- SET QUICK RANGE ---
function setQuickRange(days) {
  const today = new Date();
  document.getElementById("filterStart").value = today.toISOString().split('T')[0];

  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() + days);
  document.getElementById("filterEnd").value = endDate.toISOString().split('T')[0];

  fetchVisibleRoadworks();
}

// --- EVENT LISTENERS ---
map.on('moveend', fetchVisibleRoadworks);
map.on('zoomend', fetchVisibleRoadworks);

document.getElementById("filterStart").addEventListener("change", fetchVisibleRoadworks);
document.getElementById("filterEnd").addEventListener("change", fetchVisibleRoadworks);

// --- INITIAL LOAD ---
fetchVisibleRoadworks();
