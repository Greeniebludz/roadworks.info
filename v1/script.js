// --- BASIC MAP ---
const map = L.map("map").setView([51.4, -0.7], 10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

// --- YOUR GEOJSON API ---
const DATA_URL = "https://getlatestpermit.jamesgreen-928.workers.dev/roadworks";

// --- LOAD PINS ---
async function loadPins() {
  try {
    const res = await fetch(DATA_URL);
    const geo = await res.json();

    console.log("Loaded features:", geo.features.length);

const layer = L.geoJSON(geo, {
  pointToLayer: (feature, latlng) => L.marker(latlng),
  onEachFeature: (feature, layer) => {
    const p = feature.properties || {};

    layer.bindPopup(`
      <div style="font-size:14px; line-height:1.4; padding:4px;">
        <strong>Promoter:</strong> ${p.promoter_organisation || "-"}<br/>
        <strong>TM:</strong> ${p.traffic_management_type || "-"}<br/>
        <strong>Permit Ref:</strong> ${p.permit_reference_number || "-"}<br/>
        <strong>Event Status:</strong> ${p.work_status || p.event_type || "-"}<br/>
        <strong>Proposed Start:</strong> ${p.proposed_start_date || "-"}<br/>
        <strong>Proposed End:</strong> ${p.proposed_end_date || "-"}
      </div>
    `);
  }
});

layer.addTo(map);   // ✔ CORRECT PLACE


    if (layer.getLayers().length > 0) {
      map.fitBounds(layer.getBounds(), { padding: [50, 50] });
    } else {
      console.warn("No pins to display.");
    }

  } catch (err) {
    console.error("Error loading pins:", err);
  }
}

loadPins();

