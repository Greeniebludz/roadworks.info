const debug = document.getElementById("debug");
const statusFilter = document.getElementById("statusFilter");

// Correct path to JSON (one folder up)
const dataUrl = "../sample-roadworks.json";

// Initialise map
const map = L.map('map').setView([51.4, -0.7], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const markers = L.markerClusterGroup();

function formatPopup(item) {
  const start = item.start || 'N/A';
  const end = item.end || 'N/A';
  return `
    <div style="min-width:200px">
      <strong>${item.title}</strong><br/>
      <small>${item.status} • ${start} → ${end}</small>
      <hr style="margin:6px 0"/>
      <div>${item.description || ''}</div>
    </div>`;
}
function mapSMtoPOC(sm) {
  const o = sm.object_data;

  // Extract first coordinate pair from LINESTRING
  let lat = null;
  let lon = null;

  if (o.works_location_coordinates && o.works_location_coordinates.startsWith("LINESTRING")) {
    const coords = o.works_location_coordinates
      .replace("LINESTRING(", "")
      .replace(")", "")
      .split(",")[0] // first point only
      .trim()
      .split(" ");

    // OSGB36 eastings/northings (we will convert later)
    const easting = parseFloat(coords[0]);
    const northing = parseFloat(coords[1]);

    // For now, store raw values
    lat = northing;
    lon = easting;
  }

  return {
    id: o.permit_reference_number || sm.event_reference,
    title: `${o.street_name || "Unknown Street"} (${o.town || ""})`,
    status: o.work_status || "Unknown",
    start: o.actual_start_date_time || o.proposed_start_date,
    end: o.actual_end_date_time || o.proposed_end_date,
    lat: lat,
    lon: lon,
    description: `${o.work_category || ""} — ${o.traffic_management_type || ""}`
  };
}

function loadData() {
  markers.clearLayers();
  debug.textContent = "Loading…";

  fetch(dataUrl)
    .then(r => r.json())
    .then(items => {
   const startDate = document.getElementById("startDate").value;
const endDate = document.getElementById("endDate").value;

const filtered = items.filter(i => {
  if (!i.lat || !i.lon) return false;

  // Status filter
  if (statusFilter.value && i.status !== statusFilter.value) return false;

  // Date filter
  if (startDate) {
    if (!i.start || new Date(i.start) < new Date(startDate)) return false;
  }

  if (endDate) {
    if (!i.end || new Date(i.end) > new Date(endDate)) return false;
  }

  return true;
});


      filtered.forEach(i => {
        const m = L.marker([i.lat, i.lon]);
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

document.getElementById("loadDataBtn").addEventListener("click", loadData);
statusFilter.addEventListener("change", loadData);

startDate.addEventListener("change", loadData);
endDate.addEventListener("change", loadData);
// Load on startup
loadData();
