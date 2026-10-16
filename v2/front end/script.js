  const MAPTILER_KEY = "84APRuB9gcvyT3xzXkKa";

  const map = L.map('map').setView([51.4545, -0.9781], 12);

  L.tileLayer(
    `https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`,
    {
      attribution: '&copy; MapTiler &copy; OpenStreetMap contributors'
    }
  ).addTo(map);

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

      const defaultIcon = L.icon({ iconUrl: '/icons/c-icon.png', iconSize: [32, 32] });

      function getIcon(feature) {
        const tmType = feature.properties.object_data?.traffic_management_type;
        return icons[tmType] || defaultIcon;
      }

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
          L.marker(latlng, { icon: getIcon(feature) }),

       onEachFeature: (feature, layer) => {
  const p = feature.properties || {};
  const tmType = p.object_data?.traffic_management_type ?? "—";

  // Popup
  const popup = `<b>${p.permit_reference ?? p.event_reference}</b><br>` +
                `Status: ${p.permit_status ?? "—"}<br>` +
                `Type: ${p.geometry_type ?? "—"}<br>` +
                `TM: ${tmType}<br>` +
                `Time: ${p.event_time ?? "—"}`;

  layer.bindPopup(popup);

  // Side panel click handler
  layer.on("click", () => {
    const panel = document.getElementById("info-callout");
    panel.classList.remove("hidden");
    panel.classList.remove("collapsed");

    const friendlyStart = p.proposed_start_date
      ? new Date(p.proposed_start_date).toLocaleString()
      : null;

    const friendlyEnd = p.proposed_end_date
      ? new Date(p.proposed_end_date).toLocaleString()
      : null;

    panel.innerHTML = `
      <h2>${p.promoter_organisation || "Unknown Promoter"}</h2>

      <h3 style="margin-top:4px;">
        ${tmType}
        <span style="color:#888; font-size:12px;">(what does this mean?)</span>
      </h3>

      <p>
        ${p.works_location_type ? `<div><strong>Location Type:</strong> ${p.works_location_type}</div>` : ""}
        ${p.work_category ? `<div><strong>Work Category:</strong> ${p.work_category}</div>` : ""}
      </p>

      <hr/>

      ${friendlyStart ? `<p><strong>Start:</strong> ${friendlyStart}</p>` : ""}
      ${friendlyEnd ? `<p><strong>End:</strong> ${friendlyEnd}</p>` : ""}

      <hr/>

      ${p.street_name ? `<div><strong>Street:</strong> ${p.street_name}</div>` : ""}
      ${p.town ? `<div><strong>Town:</strong> ${p.town}</div>` : ""}
      ${p.highway_authority ? `<div><strong>Highway Authority:</strong> ${p.highway_authority}</div>` : ""}

      <hr/>

      ${p.permit_reference_number ? `<div><strong>Permit Ref:</strong> ${p.permit_reference_number}</div>` : ""}
      ${p.permit_status ? `<div><strong>Permit Status:</strong> ${p.permit_status}</div>` : ""}
      ${p.work_status ? `<div><strong>Work Status:</strong> ${p.work_status}</div>` : ""}
    `;
  });

  // Center marker for non-point geometries
  if (p.geometry_type !== "Point") {
    const center = layer.getBounds().getCenter();
    const marker = L.marker(center, { icon: getIcon(feature) })
      .bindPopup(popup);
    centerMarkers.push(marker);
  }
}

      }).addTo(map);

      centerMarkers.forEach(m => m.addTo(map));

    } catch (err) {
      console.error("Failed to load GeoJSON:", err);
    }
  }

  loadRoadworks();

  const callout = document.getElementById('info-callout');
  const toggle = document.getElementById('callout-toggle');

  callout.addEventListener('click', () => {
    const expanded = callout.classList.toggle('expanded');
    toggle.textContent = expanded ? '▲' : '▼';
  });

