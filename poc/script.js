const MAPTILER_KEY = "84APRuB9gcvyT3xzXkKa";

// --- MAP SETUP ---
const map = L.map("map").setView([51.4, -0.7], 10);

// Basemap
L.tileLayer(
  `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`,
  { attribution: "&copy; MapTiler" }
).addTo(map);

// --- LOAD ROADWORKS GEOJSON ---
const DATA_URL = "https://sm-push-listener.jamesgreen-928.workers.dev/roadworks";

function loadPins() {
  fetch(DATA_URL)
    .then(r => r.json())
    .then(geojson => {
      const features = geojson.features || [];

      L.geoJSON(features, {
        pointToLayer: (feature, latlng) => {
          return L.marker(latlng);
        },
        onEachFeature: (feature, layer) => {
          const p = feature.properties || {};

          layer.bindPopup(`
            <strong>${p.street_name || "Unknown street"}</strong><br/>
            ${p.town || ""}<br/>
            <strong>Status:</strong> ${p.work_status || "Unknown"}<br/>
            <strong>Promoter:</strong> ${p.promoter_organisation || "-"}<br/>
            <strong>TM:</strong> ${p.traffic_management_type || "-"}<br/>
            <strong>Start:</strong> ${p.proposed_start_date || "-"}<br/>
            <strong>End:</strong> ${p.proposed_end_date || "-"}<br/>
            <strong>Ref:</strong> ${p.work_reference_number || p.permit_reference_number || "-"}
          `);
        }
      }).addTo(map);
    })
    .catch(err => {
      console.error("Error loading pins:", err);
    });
}

// Load pins on startup
loadPins();
