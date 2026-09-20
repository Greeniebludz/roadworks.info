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
      const filtered = items.filter(i => {
        if (!i.lat || !i.lon) return false;
        if (!statusFilter.value) return true;
        return i.status === statusFilter.value;
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

// Load on startup
loadData();
