// --- BASIC MAP ---
const map = L.map("map").setView([51.5, -0.1], 12);

// Tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);

// --- SEARCH BOX ---
L.Control.geocoder({
  defaultMarkGeocode: true,
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

// --- FETCH ONLY VISIBLE AREA ---
async function fetchVisibleRoadworks() {
  const requestId = ++latestRequestId;

  const bounds = map.getBounds();
  const minLon = bounds.getWest();
  const minLat = bounds.getSouth();
  const maxLon = bounds.getEast();
  const maxLat = bounds.getNorth();

  const url = `https://roadworks.info/roadworks?minLon=${minLon}&minLat=${minLat}&maxLon=${maxLat}&maxLat=${maxLat}`;

  const geojson = await safeFetchJSON(url);

  if (requestId !== latestRequestId) {
    console.log("Ignoring stale response", requestId);
    return;
  }

  console.log("Loaded features:", geojson.features.length);

  if (pinsLayer) {
    map.removeLayer(pinsLayer);
  }

  // --- DOT ICON ---
  const dotIcon = L.divIcon({
    className: "dot-icon",
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
    give_take: L.icon({
      iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
      shadowUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }),
    lane_closure: L.icon({
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

  // --- ADD NEW LAYER ---
  pinsLayer = L.geoJSON(geojson, {
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
      const geom = feature.geometry;

      // --- POPUP ---
      layer.bindPopup(`
        <div style="font-size:14px; line-height:1.5; padding:6px;">
          <div style="font-weight:bold; font-size:16px; margin-bottom:6px;">
            ${p.promoter_organisation || "Unknown Promoter"}
          </div>

          <div style="font-size:15px; font-weight:bold;">
            ${p.traffic_management_type || "Traffic Management"}
            <span style="color:#0077cc; font-size:12px;">(what does this mean?)</span>
          </div>

          <div style="margin-top:4px;"></div>
          ${p.works_location_type ? `<div><strong>Location Type:</strong> ${p.works_location_type}</div>` : ""}
          ${p.work_category ? `<div><strong>Work Category:</strong> ${p.work_category}</div>` : ""}

          <hr />

          ${p.proposed_start_date ? `<div><strong>Start:</strong> ${new Date(p.proposed_start_date).toLocaleString()}</div>` : ""}
          ${p.proposed_end_date ? `<div><strong>End:</strong> ${new Date(p.proposed_end_date).toLocaleString()}</div>` : ""}

          <hr />

          ${p.street_name ? `<div><strong>Street:</strong> ${p.street_name}</div>` : ""}
          ${p.town ? `<div><strong>Town:</strong> ${p.town}</div>` : ""}
          ${p.highway_authority ? `<div><strong>Highway Authority:</strong> ${p.highway_authority}</div>` : ""}

          <hr />

          ${p.permit_reference_number ? `<div><strong>Permit Ref:</strong> ${p.permit_reference_number}</div>` : ""}
          ${p.permit_status ? `<div><strong>Permit Status:</strong> ${p.permit_status}</div>` : ""}
          ${p.work_status ? `<div><strong>Work Status:</strong> ${p.work_status}</div>` : ""}
        </div>
      `);

      const tm = p.traffic_management_type || "";
        const key = tm.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace.replace(/_+/g, "_").replace.replace(/^_+|_+$/g, "")
        const icon = iconSet[key] || iconSet.default;
      
      // --- ADD PIN FOR LINESTRING ---
      if (geom.type === "LineString") {
        const coords = geom.coordinates;
        const midpoint = coords[Math.floor(coords.length / 2)];
        const latlng = L.latLng(midpoint[1], midpoint[0]);
const key = tm.toLowerCase();
        

        L.marker(latlng, { icon })
          .bindPopup(layer.getPopup())
          .addTo(map);
      }

      // --- ADD PIN FOR POLYGON ---
      if (geom.type === "Polygon") {
        const centroid = layer.getBounds().getCenter();

        const tm = p.traffic_management_type || "";
        const key = tm.toLowerCase();
        const icon = iconSet[key] || iconSet.default;

        L.marker(centroid, { icon })
          .bindPopup(layer.getPopup())
          .addTo(map);
      }
    },
  }).addTo(map);
}

// --- DEBOUNCE MOVEMENT ---
let debounceTimer = null;

function debouncedFetch() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(fetchVisibleRoadworks, 250);
}

map.on("moveend", debouncedFetch);
map.on("zoomend", debouncedFetch);

// --- INITIAL LOAD ---
fetchVisibleRoadworks();
