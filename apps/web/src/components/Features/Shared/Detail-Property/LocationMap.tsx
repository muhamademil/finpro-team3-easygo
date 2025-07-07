'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression, Icon } from 'leaflet';

interface Coordinates {
  lat: number;
  lng: number;
}

interface LocationMapProps {
  coordinates: Coordinates;
}

// Mengatasi masalah ikon default di Leaflet dengan Next.js
const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

export default function LocationMap({ coordinates }: LocationMapProps) {
  const position: LatLngExpression = [coordinates.lat, coordinates.lng];

  // Periksa apakah komponen dijalankan di browser sebelum merender peta
  if (typeof window === 'undefined') {
    return <div className="w-full h-96 bg-gray-200 rounded-lg animate-pulse" />;
  }

  return (
    <div className="space-y-4 pt-8 border-t">
      <h2 className="text-2xl font-bold text-gray-900">Lokasi Properti</h2>
      <div className="w-full h-96 rounded-lg overflow-hidden">
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={customIcon}>
            <Popup>Lokasi properti berada di sekitar sini.</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
