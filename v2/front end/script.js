 <!-- Leaflet JS -->
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<script>
  const MAPTILER_KEY = "84APRuB9gcvyT3xzXkKa";

  const map = L.map('map').setView([51.4545, -0.9781], 12);

  L.tileLayer(
    `https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`,
    {
      attribution: '&copy; MapTiler &copy; OpenStreetMap contributors'
    }
  ).addTo(map);

  // Load GeoJSON from your API Worker
  async function loadRoadworks() {
    try {
     const res = await fetch("https://sm-map-api.jamesgreen-928.workers.dev/api/current");
const geojson = await res.json();

const centerMarkers = [];

const roadworksLayer = L.geoJSON(geojson, {
  style: (feature) => {
    switch (feature.properties.geometry_type) {
      case "LineString": return { color: "#ff6600", weight: 3, opacity: 0.8 };
      case "Polygon":    return { color: "#3388ff", weight: 2, fillColor: "#3388ff", fillOpacity: 0.2 };
      default:           return { color: "#3388ff" };
    }
  },
  pointToLayer: (feature, latlng) =>
    L.circleMarker(latlng, { radius: 6, color: "#3388ff", fillOpacity: 0.7 }),

  onEachFeature: (feature, layer) => {
    const p = feature.properties;
    const popup = `<b>${p.permit_reference ?? p.event_reference}</b><br>` +
                  `Status: ${p.permit_status ?? "—"}<br>` +
                  `Type: ${p.geometry_type ?? "—"}<br>` +
                  `Time: ${p.event_time ?? "—"}`;

    layer.bindPopup(popup);

    // Add a center pin for LineStrings and Polygons
    if (feature.properties.geometry_type !== "Point") {
      const center = layer.getBounds().getCenter();
      const marker = L.circleMarker(center, {
        radius: 5,
        color: "#333",
        fillColor: "#fff",
        fillOpacity: 1,
        weight: 2
      }).bindPopup(popup);
      centerMarkers.push(marker);
    }
  }
}).addTo(map);

// Add center markers on top
centerMarkers.forEach(m => m.addTo(map));


    } catch (err) {
      console.error("Failed to load GeoJSON:", err);
    }
  }

  loadRoadworks();

  // Expandable callout logic
  const callout = document.getElementById('info-callout');
  const toggle = document.getElementById('callout-toggle');

  callout.addEventListener('click', () => {
    const expanded = callout.classList.toggle('expanded');
    toggle.textContent = expanded ? '▲' : '▼';
  });

