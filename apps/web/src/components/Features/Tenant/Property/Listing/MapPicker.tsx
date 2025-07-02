'use client';

import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression, Icon, Marker as LeafletMarker } from 'leaflet';
import { useMemo, useRef } from 'react';
import { useListingStore } from '@/stores/useListing.store';

const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function ChangeView({ center }: { center: LatLngExpression }) {
  const map = useMap();
  map.setView(center);
  return null;
}

export const MapPicker = () => {
  const { listingData, setCoordinates } = useListingStore();
  const position: LatLngExpression = [
    listingData.latitude,
    listingData.longitude,
  ];

  const markerRef = useRef<LeafletMarker | null>(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const { lat, lng } = marker.getLatLng();
          setCoordinates({ lat, lng });
        }
      },
    }),
    [setCoordinates],
  );

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '400px', width: '100%', borderRadius: '12px' }}
    >
      <ChangeView center={position} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
        icon={customIcon}
      />
    </MapContainer>
  );
};
