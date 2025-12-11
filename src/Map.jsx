import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function MapView({ data }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Create map once
      mapRef.current = L.map("map", { zoomControl: true }).setView([0, 0], 2);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapRef.current);
    }

    if (data) {
      const lat = data.latitude;
      const lng = data.longitude;
      const OFFSET_LAT = lat + 0.0025;

      // Move map
      mapRef.current.setView([OFFSET_LAT, lng], 17);

      // Remove previous marker if exists
      if (markerRef.current) {
        markerRef.current.remove();
      }

      // Add new marker
      markerRef.current = L.marker([lat, lng])
        .addTo(mapRef.current)
        .bindPopup(
          `<b>${data.city}, ${data.country}</b><br/>ISP: ${data.connection.isp}<br/>IP: ${data.ip}`
        )
        .openPopup();
    }
  }, [data]); // re-run when data changes

  return <div id="map" className="w-full h-full"></div>;
}
