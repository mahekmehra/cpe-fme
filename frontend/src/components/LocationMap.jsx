import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from "react-leaflet";

import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function ChangeView({ center }) {

  const map = useMap();

  map.setView(center, 14);

  return null;
}

export default function LocationMap({
  latitude,
  longitude
}) {

  // Safe conversion
  const lat = Number(latitude);
  const lng = Number(longitude);

  // Bengaluru fallback
  const center = [
    isNaN(lat) ? 12.9716 : lat,
    isNaN(lng) ? 77.5946 : lng
  ];

  return (
    <div
      className="
      bg-slate-800
      rounded-xl
      p-6
    "
    >

      <h2
        className="
        text-2xl
        font-bold
        mb-4
      "
      >
        Incident Location
      </h2>

      <MapContainer
        key={`${center[0]}-${center[1]}`}
        center={center}
        zoom={14}
        style={{
          height: "350px",
          width: "100%"
        }}
      >

        <ChangeView center={center} />

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={center}>
          <Popup>
            Traffic Incident
            <br />
            Lat: {center[0]}
            <br />
            Long: {center[1]}
          </Popup>
        </Marker>

      </MapContainer>

    </div>
  );
}