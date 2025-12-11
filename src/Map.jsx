import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function MapView() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    // Create map only once
    if (L.DomUtil.get("map") !== null) {
      L.DomUtil.get("map")._leaflet_id = null;
    }

    const map = L.map("map", {
      zoomControl: true,
    }).setView([0, 0], 2); // Start zoomed out before location loads

    // Tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    async function loadLocation() {
      const res = await fetch("https://ipwho.is/");
      const data = await res.json();
      setInfo(data);

      const lat = data.latitude;
      const lng = data.longitude;

      // Move map to user location
      map.setView([lat, lng], 13);

      // Add marker
      L.marker([lat, lng]).addTo(map).bindPopup(`
        <b>${data.city}, ${data.country}</b><br/>
        ISP: ${data.org}<br/>
        IP: ${data.ip}
      `);
    }

    loadLocation();
  }, []);

  return <div id="map" className="w-full h-full"></div>;
}
