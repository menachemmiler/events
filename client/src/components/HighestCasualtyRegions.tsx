import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

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

const HighestCasualtyRegions = () => {
  const [attackData, setAttackData] = useState<
    {
      _id: string;
      avg: number;
      coordinates: {
        latitude: number;
        longitude: number;
      };
    }[]
  >([]);
  const [region, setRegion] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const fetchData = async (
    region?: string,
    country?: string,
    city?: string
  ) => {
    try {
      const response = await fetch(
        `http://localhost:1313/api/analysis/highest-casualty-regions${
          region
            ? `?region=${region}`
            : country
            ? `?country=${country}`
            : city
            ? `?city=${city}`
            : ""
        }`
      );
      const data = await response.json();
      setAttackData(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    console.log({ attackData });
  }, [attackData]);

  // מיקום התחלתי לברירת מחדל
  const initialPosition: [number, number] = [51.505, -0.09];
  const initialZoom = 13;

  // מקומות לאזורים שהתקבלו
  const positions = attackData
    .filter(
      (region) =>
        !isNaN(region.coordinates.latitude) &&
        !isNaN(region.coordinates.longitude)
    )
    .map((region) => ({
      position: [region.coordinates.latitude, region.coordinates.longitude],
      name: region._id,
      avg: region.avg,
    }));

  return (
    <div className="highestCasualtyRegions">
      <div className="filter">
        <input
          type="text"
          placeholder="חיפוש לפי עיר"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="חיפוש לפי מדינה"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="חיפוש לפי איזור"
          value={region}
          onChange={(e) => {
            setRegion(e.target.value);
          }}
        />
        <button
          onClick={() => {
            fetchData(region, country, city);
          }}
        >
          חפש
        </button>
      </div>
      <div className="map">
        <MapContainer
          style={{ width: "100%", height: "100%" }}
          center={initialPosition}
          zoom={initialZoom}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* עדכון המפה עם מקומות */}
          {positions.map((region, index) => (
            <Marker key={index} position={region.position as [number, number]}>
              <Popup>
                <div>{region.name} </div>
                רמת סיכון{region.avg}
              </Popup>
            </Marker>
          ))}

          {/* עדכון המפה עם מיקום מרכז וזום */}
          {positions.length > 0 ? (
            <UpdateMapView position={positions[0].position} zoom={12} />
          ) : (
            <UpdateMapView position={initialPosition} zoom={13} />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default HighestCasualtyRegions;
