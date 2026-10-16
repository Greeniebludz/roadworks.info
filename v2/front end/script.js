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

// Define your icons
const icons = {
  "two-way signals": L.icon({ iconUrl: '/icons/tsa-icon.png', iconSize: [32, 32] }),
  "some carriageway incursion": L.icon({ iconUrl: '/icons/c-icon.png', iconSize: [32, 32] }),
  "give and take": L.icon({ iconUrl: '/icons/rwa-tbc-icon.png', iconSize: [32, 32] }),
  "lane closure": L.icon({ iconUrl: '/icons/rwa-tbc-icon.png', iconSize: [32, 32] }),
  "no carriageway incursion": L.icon({ iconUrl: '/icons/c-icon.png', iconSize: [32, 32] }),
  "road closure": L.icon({ iconUrl: '/icons/road-closure-icon.png', iconSize: [32, 32] }),
};

// Default fallback icon
const defaultIcon = L.icon({ iconUrl: '/icons/default-icon.png', iconSize: [32, 32] });

function getIcon(feature) {
  const tmType = feature.properties.object_data?.traffic_management_type;
  return icons[tmType] || defaultIcon;
}

// Load and render
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

  // Custom icons for Points
  pointToLayer: (feature, latlng) =>
    L.marker(latlng, { icon: getIcon(feature) }),

  onEachFeature: (feature, layer) => {
    const p = feature.properties;
    const tmType = p.object_data?.traffic_management_type ?? "—";
    const popup = `<b>${p.permit_reference ?? p.event_reference}</b><br>` +
                  `Status: ${p.permit_status ?? "—"}<br>` +
                  `Type: ${p.geometry_type ?? "—"}<br>` +
                  `TM: ${tmType}<br>` +
                  `Time: ${p.event_time ?? "—"}`;

    layer.bindPopup(popup);

    // Add a center pin with custom icon for LineStrings and Polygons
    if (feature.properties.geometry_type !== "Point") {
      const center = layer.getBounds().getCenter();
      const marker = L.marker(center, { icon: getIcon(feature) })
        .bindPopup(popup);
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

