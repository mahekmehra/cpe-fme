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

function ChangeView({
  center
}) {

  const map = useMap();

  map.setView(
    center,
    14
  );

  return null;
}

export default function LocationMap({
  latitude,
  longitude
}) {

  const center = [
    latitude,
    longitude
  ];

  return (

    <div className="
      bg-slate-800
      rounded-xl
      p-6
    ">

      <h2 className="
        text-2xl
        font-bold
        mb-4
      ">
        Incident Location
      </h2>

      <MapContainer
        center={center}
        zoom={14}
        style={{
          height: "350px",
          width: "100%"
        }}
      >

        <ChangeView
          center={center}
        />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={center}
        >

          <Popup>
            Traffic Incident
          </Popup>

        </Marker>

      </MapContainer>

    </div>
  );
}