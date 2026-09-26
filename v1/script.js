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
 layer.bindPopup(`
  <div style="font-size:14px; line-height:1.4; padding:4px;">
    <strong style="font-size:16px;">${p.street_name || "Unknown street"}</strong><br/>
    ${p.town || ""}<br/><br/>

    <strong>${p.event_type || "-"}</strong> • ${p.work_status || "-"}<br/>
    <strong>TM:</strong> ${p.traffic_management_type || "-"}<br/>
    <strong>Promoter:</strong> ${p.promoter_organisation || "-"}<br/><br/>

    <strong>Start:</strong> ${p.proposed_start_date || p.actual_start_date_time || "-"}<br/>
    <strong>End:</strong> ${p.proposed_end_date || p.actual_end_date_time || "-"}<br/><br/>

    <strong>Work Ref:</strong> ${p.work_reference_number || "-"}<br/>
    <strong>Permit Ref:</strong> ${p.permit_reference_number || "-"}
  </div>
`);


    layer.addTo(map);

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

