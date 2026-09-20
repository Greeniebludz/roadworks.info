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
