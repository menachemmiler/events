// import { useEffect, useState } from "react";
// import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { popupContent, popupHead, popupText } from "../utils/popupStyles";

// // פונקציה לעדכון מיקום המפה והזום
// const UpdateMapView = ({
//   position,
//   zoom,
// }: {
//   position: [number, number];
//   zoom: number;
// }) => {
//   const map = useMap();
//   useEffect(() => {
//     map.setView(position, zoom);
//   }, [position, zoom, map]);

//   return null;
// };

// const HighestCasualtyRegions = () => {
//   const [attackData, setAttackData] = useState<
//     {
//       _id: string;
//       avg: number;
//       coordinates: {
//         latitude: number;
//         longitude: number;
//       };
//     }[]
//   >([]);
//   const [region, setRegion] = useState<string>("");
//   const [country, setCountry] = useState<string>("");
//   const [city, setCity] = useState<string>("");

//   const fetchData = async (
//     region?: string,
//     country?: string,
//     city?: string
//   ) => {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_BASE_URL}/api/analysis/highest-casualty-regions${
//           region
//             ? `?region=${region}`
//             : country
//             ? `?country=${country}`
//             : city
//             ? `?city=${city}`
//             : ""
//         }`
//       );
//       const data = await response.json();
//       setAttackData(data.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     console.log({ attackData });
//   }, [attackData]);

//   // מיקום התחלתי להצגה כש-הדף נטען
//   const initialPosition: [number, number] = [51.505, -0.09];
//   const initialZoom = 4; // זום קבוע

//   // לוודאות שלכולם יש נקודות ציון
//   const positions = attackData
//     .filter(
//       (region) =>
//         !isNaN(region.coordinates.latitude) &&
//         !isNaN(region.coordinates.longitude) &&
//         region.coordinates.latitude !== null &&
//         region.coordinates.longitude !== null
//     )
//     .map((region) => ({
//       position: [region.coordinates.latitude, region.coordinates.longitude],
//       name: region._id,
//       avg: region.avg,
//     }));

//   // חישוב גבולות המיקומים
//   const bounds = positions.reduce(
//     (total, currentValue) => {
//       total.minLat = Math.min(total.minLat, currentValue.position[0]);
//       total.maxLat = Math.max(total.maxLat, currentValue.position[0]);
//       total.minLng = Math.min(total.minLng, currentValue.position[1]);
//       total.maxLng = Math.max(total.maxLng, currentValue.position[1]);
//       return total;
//     },
//     { minLat: Infinity, maxLat: -Infinity, minLng: Infinity, maxLng: -Infinity }
//   );

//   // חישוב מרכז המפה על פי הגבולות
//   let centerPosition: [number, number];
//   if (positions.length > 1) {
//     //אם יש כמה שיקח אותו לבעל רמת הסיכון הגבוהה ביותר
//     centerPosition = positions[0].position as [number, number];
//   } else if (positions.length) {
//     centerPosition = [
//       (bounds.minLat + bounds.maxLat) / 2,
//       (bounds.minLng + bounds.maxLng) / 2,
//     ];
//   } else {
//     centerPosition = initialPosition;
//   }

//   return (
//     <div className="highestCasualtyRegions">
//       <div className="filter">
//         <input
//           style={{ textEmphasisColor: "red" }}
//           type="text"
//           placeholder="חיפוש לפי עיר"
//           value={city}
//           onChange={(e) => {
//             setCity(e.target.value);
//             setCountry("");
//             setRegion("");
//           }}
//         />
//         <input
//           type="text"
//           placeholder="חיפוש לפי מדינה"
//           value={country}
//           onChange={(e) => {
//             setCountry(e.target.value);
//             setCity("");
//             setRegion("");
//           }}
//         />
//         <input
//           type="text"
//           placeholder="חיפוש לפי איזור"
//           value={region}
//           onChange={(e) => {
//             setRegion(e.target.value);
//             setCountry("");
//             setCity("");
//           }}
//         />
//         <button
//           onClick={() => {
//             setCountry("");
//             setCity("");
//             setRegion("");
//             fetchData();
//           }}
//         >
//           חפש לפי כל האיזורים
//         </button>
//         <button onClick={() => fetchData(region, country, city)}>🔍</button>
//       </div>
//       <div className="map">
//         <MapContainer
//           style={{ width: "100%", height: "100%" }}
//           // center={centerPosition}
//           zoom={initialZoom} // זום קבוע
//           scrollWheelZoom={false}
//         >
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />

//           {/* עדכון המפה עם מקומות */}
//           {positions.map((region, index) => (
//             <Marker key={index} position={region.position as [number, number]}>
//               <Popup>
//                 <div style={popupContent as React.CSSProperties}>
//                   <div style={popupHead as React.CSSProperties}>
//                     {region.name}
//                   </div>
//                   <div style={popupText as React.CSSProperties}>רמת סיכון{region.avg}</div>
//                 </div>
//               </Popup>
//             </Marker>
//           ))}

//           {/* עדכון המפה עם מיקום מרכז וזום */}
//           <UpdateMapView
//             position={centerPosition}
//             zoom={initialZoom} // זום קבוע
//           />
//         </MapContainer>
//       </div>
//     </div>
//   );
// };

// export default HighestCasualtyRegions;


import { useEffect, useState } from "react";
import MyMap from "./MyMap";
import { Position } from "../DTO/position";

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
  const [filters, setFilters] = useState({ region: "", country: "", city: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAttackData = async (region = "", country = "", city = "") => {
    const query = region
      ? `?region=${region}`
      : country
      ? `?country=${country}`
      : city
      ? `?city=${city}`
      : "";
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/analysis/highest-casualty-regions${query}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch attack data");
    }
    const data = await response.json();
    return data.data;
  };

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAttackData(
        filters.region,
        filters.country,
        filters.city
      );
      setAttackData(data);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [filters]);

  const positions = attackData.map((region) => ({
    position: [region.coordinates.latitude, region.coordinates.longitude],
    name: region._id,
    dataString: `רמת סיכון ${region.avg}%`,
  }));

    // חישוב מרכז המפה על פי הגבולות
  let centerPosition: [number, number];
  if (positions.length >= 1) {
    //אם יש כמה שיקח אותו לבעל רמת הסיכון הגבוהה ביותר
    centerPosition = positions[0].position as [number, number];
  }
  else {
    centerPosition = [51.505, -0.09];
  }

  return (
    <div className="highestCasualtyRegions">
      <div className="filter">
        <input
          type="text"
          placeholder="חיפוש לפי עיר"
          value={filters.city}
          onChange={(e) =>
            setFilters({ ...filters, city: e.target.value, country: "", region: "" })
          }
        />
        <input
          type="text"
          placeholder="חיפוש לפי מדינה"
          value={filters.country}
          onChange={(e) =>
            setFilters({ ...filters, country: e.target.value, city: "", region: "" })
          }
        />
        <input
          type="text"
          placeholder="חיפוש לפי אזור"
          value={filters.region}
          onChange={(e) =>
            setFilters({ ...filters, region: e.target.value, city: "", country: "" })
          }
        />
        <button onClick={() => setFilters({ region: "", country: "", city: "" })}>
          חפש לפי כל האזורים
        </button>
      </div>

      {loading ? (
        <p>טוען נתונים...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <MyMap
          centerPosition={centerPosition} // מרכז ברירת מחדל
          initialZoom={4}
          positions={positions as Position[]}
        />
      )}
    </div>
  );
};

export default HighestCasualtyRegions;

