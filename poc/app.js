const debug = document.getElementById("debug");
const statusFilter = document.getElementById("statusFilter");

// Correct path to JSON (one folder up)
const dataUrl = "data/sample-sm.json";

// Initialise map
const map = L.map('map').setView([51.4, -0.7], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// We keep clustering, but disable it early.
// Clustering only happens when zoomed OUT.
const markers = L.markerClusterGroup({
  disableClusteringAtZoom: 20,   // was 13
  maxClusterRadius: 40,
  spiderfyOnMaxZoom: true,
  removeOutsideVisibleBounds: true
});

map.on("zoomend", () => {
  const zoom = map.getZoom();

  markers.eachLayer(marker => {
    if (zoom >= 16) {             // was 14
      marker.setIcon(marker.tmIcon);
    } else {
      marker.setIcon(marker.dotIcon);
    }
  });
});

// Tiny dot icon (low zoom)
const dotIcon = L.divIcon({
  className: "dot-icon",
  iconSize: [8, 8]
});

// TM-type icons (high zoom)
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

// Convert OSGB36 easting/northing to WGS84 lat/lon
function osgbToWgs84(easting, northing) {
  const a = 6377563.396;
  const b = 6356256.909;
  const F0 = 0.9996012717;
  const lat0 = 49 * Math.PI / 180;
  const lon0 = -2 * Math.PI / 180;
  const N0 = -100000;
  const E0 = 400000;
  const e2 = 1 - (b * b) / (a * a);
  const n = (a - b) / (a + b);

  let lat = lat0;
  let M = 0;

  do {
    lat = (northing - N0 - M) / (a * F0) + lat;
    const Ma = (1 + n + (5 / 4) * n * n + (5 / 4) * n * n * n) * (lat - lat0);
    const Mb = (3 * n + 3 * n * n + (21 / 8) * n * n * n) * Math.sin(lat - lat0) * Math.cos(lat + lat0);
    const Mc = ((15 / 8) * n * n + (15 / 8) * n * n * n) * Math.sin(2 * (lat - lat0)) * Math.cos(2 * (lat + lat0));
    const Md = (35 / 24) * n * n * n * Math.sin(3 * (lat - lat0)) * Math.cos(3 * (lat + lat0));
    M = b * F0 * (Ma - Mb + Mc - Md);
  } while (northing - N0 - M >= 0.00001);

  const sinLat = Math.sin(lat);
  const cosLat = Math.cos(lat);
  const nu = a * F0 / Math.sqrt(1 - e2 * sinLat * sinLat);
  const rho = a * F0 * (1 - e2) / Math.pow(1 - e2 * sinLat * sinLat, 1.5);
  const eta2 = nu / rho - 1;

  const tanLat = Math.tan(lat);
  const VII = tanLat / (2 * rho * nu);
  const VIII = tanLat / (24 * rho * Math.pow(nu, 3)) * (5 + 3 * tanLat * tanLat + eta2 - 9 * tanLat * tanLat * eta2);
  const IX = tanLat / (720 * rho * Math.pow(nu, 5)) * (61 + 90 * tanLat * tanLat + 45 * Math.pow(tanLat, 4));
  const X = 1 / (cosLat * nu);
  const XI = 1 / (6 * cosLat * Math.pow(nu, 3)) * (nu / rho + 2 * tanLat * tanLat);
  const XII = 1 / (120 * cosLat * Math.pow(nu, 5)) * (5 + 28 * tanLat * tanLat + 24 * Math.pow(tanLat, 4));
  const XIIA = 1 / (5040 * cosLat * Math.pow(nu, 7)) * (61 + 662 * tanLat * tanLat + 1320 * Math.pow(tanLat, 4) + 720 * Math.pow(tanLat, 6));

  const dE = easting - E0;

  const latRad = lat - VII * dE * dE + VIII * Math.pow(dE, 4) - IX * Math.pow(dE, 6);
  const lonRad = lon0 + X * dE - XI * Math.pow(dE, 3) + XII * Math.pow(dE, 5) - XIIA * Math.pow(dE, 7);

  const latDeg = latRad * 180 / Math.PI;
  const lonDeg = lonRad * 180 / Math.PI;

  return { lat: latDeg, lon: lonDeg };
}

function mapSMtoPOC(sm) {
  const o = sm.object_data;

  const tm = (o.current_traffic_management_type_ref ||
              o.traffic_management_type_ref ||
              o.traffic_management_type ||
              "").toLowerCase();

  let tmKey = "default";

  if (tm.includes("road_closure")) tmKey = "road_closure";
  else if (tm.includes("multi_way_signals")) tmKey = "multi_way_signals";
  else if (tm.includes("stop")) tmKey = "stop_go_boards";
  else if (tm.includes("give")) tmKey = "give_take";
  else if (tm.includes("lane")) tmKey = "lane_closure";

  let lat = null;
  let lon = null;

  if (o.works_location_coordinates && o.works_location_coordinates.startsWith("LINESTRING")) {
    const coords = o.works_location_coordinates
      .replace("LINESTRING(", "")
      .replace(")", "")
      .split(",")[0]
      .trim()
      .split(" ");

    const easting = parseFloat(coords[0]);
    const northing = parseFloat(coords[1]);

    const wgs = osgbToWgs84(easting, northing);
    lat = wgs.lat;
    lon = wgs.lon;
  }

  return {
    id: o.permit_reference_number || sm.event_reference,
    title: `${o.street_name || "Unknown Street"} (${o.town || ""})`,
    status: o.work_status || "Unknown",
    start: o.actual_start_date_time || o.proposed_start_date,
    end: o.actual_end_date_time || o.proposed_end_date,
    lat: lat,
    lon: lon,
    description: `${o.work_category || ""} — ${o.traffic_management_type || ""}`,
    usrn: o.usrn || null,
    tmKey: tmKey
  };
}

function loadData() {
  markers.clearLayers();
  debug.textContent = "Loading…";

  fetch(dataUrl)
    .then(r => r.json())
    .then(raw => {
      const items = raw.map(mapSMtoPOC);

      const startDate = document.getElementById("startDate").value;
      const endDate = document.getElementById("endDate").value;

      const filtered = items.filter(i => {
        if (!i.lat || !i.lon) return false;

        if (statusFilter.value && i.status !== statusFilter.value) return false;

        if (startDate) {
          if (!i.start || new Date(i.start) < new Date(startDate)) return false;
        }

        if (endDate) {
          if (!i.end || new Date(i.end) > new Date(endDate)) return false;
        }

        return true;
      });

      filtered.forEach(i => {
        const m = L.marker([i.lat, i.lon], {
          icon: dotIcon   // default icon at low zoom
        });

        // store both icons
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

// Switch icons based on zoom level
map.on("zoomend", () => {
  const zoom = map.getZoom();

  markers.eachLayer(marker => {
    if (zoom >= 16) {
      marker.setIcon(marker.tmIcon);
    } else {
      marker.setIcon(marker.dotIcon);
    }
  });
});

document.getElementById("loadDataBtn").addEventListener("click", loadData);
statusFilter.addEventListener("change", loadData);

startDate.addEventListener("change", loadData);
endDate.addEventListener("change", loadData);

// Load on startup
loadData();
