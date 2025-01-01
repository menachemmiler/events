import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { popupContent, popupHead } from "../utils/popupStyles";
import { MapProps } from "../DTO/MapProps";


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
          <Marker key={index} position={region.position}>
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
