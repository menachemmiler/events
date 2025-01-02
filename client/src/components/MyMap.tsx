import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { popupContent, popupHead } from "../utils/popupStyles";
import { MapProps } from "../DTO/MapProps";
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png"
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png"
import shadowUrl from "leaflet/dist/images/marker-shadow.png"

// פונקציה לעדכון מיקום המפה והזום
const UpdateMapView = ({
  position,
  zoom,
}: {
  position: [number, number];
  zoom: number;
}) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, zoom);
  }, [position, zoom, map]);

  return null;
};


const customIcon = new L.Icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});




const MyMap: React.FC<MapProps> = ({
  centerPosition,
  initialZoom,
  positions,
}) => {
  return (
    <div className="map" style={{ width: "100%", height: "100%" }}>
      <MapContainer
        style={{ width: "100%", height: "100%" }}
        center={centerPosition}
        zoom={initialZoom}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {positions.map((region, index) => (
          <Marker key={index} position={region.position} icon={customIcon}>
            <Popup>
              <div style={popupContent as React.CSSProperties}>
                <div style={popupHead as React.CSSProperties}>{region.name}</div>
                {region.dataString && <div>{region.dataString}</div>}
                {region.dataList && (
                  <div>
                    {region.dataList.map((item, i) => (
                      <div key={`${index}-${i}`}>{item}</div>
                    ))}
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
            <UpdateMapView
            position={centerPosition}
            zoom={initialZoom}
          />
      </MapContainer>
    </div>
  );
};

export default MyMap;
