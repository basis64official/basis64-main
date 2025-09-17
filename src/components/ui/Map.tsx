import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type MapProps = {
  lat: number;
  lng: number;
  zoom?: number; // optional, default bisa 10
  className?: string; // optional, untuk styling tambahan
};

export const Map = ({ lat, lng, zoom = 10, className }: MapProps) => {
  useEffect(() => {
    const map = L.map("map", {
      center: [lat, lng],
      zoom,
      minZoom: 3,
      maxZoom: 20,
    });

    // Tile layer
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20,
      minZoom: 3,
    }).addTo(map);

    // Marker
    L.marker([lat, lng])
      .addTo(map)
      .bindPopup(`Koordinat: ${lat}, ${lng}`);

    return () => {
      map.remove();
    };
  }, [lat, lng, zoom]); // dependency biar map update kalau props berubah

  return (
    <div>
      <div id="map" className={`${className}`}></div>
    </div>
  );
};
