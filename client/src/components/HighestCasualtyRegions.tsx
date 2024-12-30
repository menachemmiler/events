import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { popupContent, popupHead, popupText } from "../utils/popupStyles";

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
        `${import.meta.env.VITE_BASE_URL}/api/analysis/highest-casualty-regions${
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

  // מיקום התחלתי להצגה כש-הדף נטען
  const initialPosition: [number, number] = [51.505, -0.09];
  const initialZoom = 4; // זום קבוע

  // לוודאות שלכולם יש נקודות ציון
  const positions = attackData
    .filter(
      (region) =>
        !isNaN(region.coordinates.latitude) &&
        !isNaN(region.coordinates.longitude) &&
        region.coordinates.latitude !== null &&
        region.coordinates.longitude !== null
    )
    .map((region) => ({
      position: [region.coordinates.latitude, region.coordinates.longitude],
      name: region._id,
      avg: region.avg,
    }));

  // חישוב גבולות המיקומים
  const bounds = positions.reduce(
    (total, currentValue) => {
      total.minLat = Math.min(total.minLat, currentValue.position[0]);
      total.maxLat = Math.max(total.maxLat, currentValue.position[0]);
      total.minLng = Math.min(total.minLng, currentValue.position[1]);
      total.maxLng = Math.max(total.maxLng, currentValue.position[1]);
      return total;
    },
    { minLat: Infinity, maxLat: -Infinity, minLng: Infinity, maxLng: -Infinity }
  );

  // חישוב מרכז המפה על פי הגבולות
  let centerPosition: [number, number];
  if (positions.length > 1) {
    //אם יש כמה שיקח אותו לבעל רמת הסיכון הגבוהה ביותר
    centerPosition = positions[0].position as [number, number];
  } else if (positions.length) {
    centerPosition = [
      (bounds.minLat + bounds.maxLat) / 2,
      (bounds.minLng + bounds.maxLng) / 2,
    ];
  } else {
    centerPosition = initialPosition;
  }

  return (
    <div className="highestCasualtyRegions">
      <div className="filter">
        <input
          style={{ textEmphasisColor: "red" }}
          type="text"
          placeholder="חיפוש לפי עיר"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setCountry("");
            setRegion("");
          }}
        />
        <input
          type="text"
          placeholder="חיפוש לפי מדינה"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            setCity("");
            setRegion("");
          }}
        />
        <input
          type="text"
          placeholder="חיפוש לפי איזור"
          value={region}
          onChange={(e) => {
            setRegion(e.target.value);
            setCountry("");
            setCity("");
          }}
        />
        <button
          onClick={() => {
            setCountry("");
            setCity("");
            setRegion("");
            fetchData();
          }}
        >
          חפש לפי כל האיזורים
        </button>
        <button onClick={() => fetchData(region, country, city)}>🔍</button>
      </div>
      <div className="map">
        <MapContainer
          style={{ width: "100%", height: "100%" }}
          // center={centerPosition}
          zoom={initialZoom} // זום קבוע
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
                <div style={popupContent as React.CSSProperties}>
                  <div style={popupHead as React.CSSProperties}>
                    {region.name}
                  </div>
                  <div style={popupText as React.CSSProperties}>רמת סיכון{region.avg}</div>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* עדכון המפה עם מיקום מרכז וזום */}
          <UpdateMapView
            position={centerPosition}
            zoom={initialZoom} // זום קבוע
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default HighestCasualtyRegions;
