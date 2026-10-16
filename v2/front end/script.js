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
          const d = p.object_data || {};
          const tmType = d.traffic_management_type ?? "—";

          const popup = `<b>${p.permit_reference ?? p.event_reference}</b><br>` +
                        `Status: ${p.permit_status ?? "—"}<br>` +
                        `Type: ${p.geometry_type ?? "—"}<br>` +
                        `TM: ${tmType}<br>` +
                        `Time: ${p.event_time ?? "—"}`;

          layer.bindPopup(popup);

          // Shared callout handler
          function showCallout() {
            const panel = document.getElementById("callout-details");
            panel.classList.remove("hidden");

            const friendlyStart = d.proposed_start_date
              ? new Date(d.proposed_start_date).toLocaleString() : null;
            const friendlyEnd = d.proposed_end_date
              ? new Date(d.proposed_end_date).toLocaleString() : null;

            panel.innerHTML = `
              <h2>${d.promoter_organisation || "Unknown Promoter"}</h2>
              <h3 style="margin-top:4px;">
                ${tmType}
                <span style="color:#888; font-size:12px;">(what does this mean?)</span>
              </h3>
              <p>
                ${d.works_location_type ? `<div><strong>Location Type:</strong> ${d.works_location_type}</div>` : ""}
                ${d.work_category ? `<div><strong>Work Category:</strong> ${d.work_category}</div>` : ""}
              </p>
              <hr/>
              ${friendlyStart ? `<p><strong>Start:</strong> ${friendlyStart}</p>` : ""}
              ${friendlyEnd ? `<p><strong>End:</strong> ${friendlyEnd}</p>` : ""}
              <hr/>
              ${d.street_name ? `<div><strong>Street:</strong> ${d.street_name}</div>` : ""}
              ${d.town ? `<div><strong>Town:</strong> ${d.town}</div>` : ""}
              ${d.highway_authority ? `<div><strong>Highway Authority:</strong> ${d.highway_authority}</div>` : ""}
              <hr/>
              ${d.permit_reference_number ? `<div><strong>Permit Ref:</strong> ${d.permit_reference_number}</div>` : ""}
              ${d.permit_status ? `<div><strong>Permit Status:</strong> ${d.permit_status}</div>` : ""}
              ${d.work_status ? `<div><strong>Work Status:</strong> ${d.work_status}</div>` : ""}
            `;
          }

          // Callout on the shape itself
          layer.on("click", showCallout);

          // Center marker for non-point geometries — also gets callout
          if (p.geometry_type !== "Point") {
            const center = layer.getBounds().getCenter();
            const marker = L.marker(center, { icon: getIcon(feature) })
              .bindPopup(popup)
              .on("click", showCallout);
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

