// import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// // מגמות שנתיות וחודשיות בתדירות התקריות
// // api/analysis/incident-trends/ :קצה כתובת
// // שיטה: GET
// // פרמטרים: שנה, חודש )אופציונלי(.
// // תיאור: מחזיר תדירות תקריות לפי שנים וחודשים )כמות התקריות הייחודיות במהלך התקופה הנבחנת.
// // לדוגמא: אם בוחנים 12 חודשים עבור שנה מסוימת, צריך לעשות aggregation לפי החודשים וכמות
// // תקריות ייחודיות באותם חודשים(
// // a. אפשרויות סינון:
// // i. בחירת שנה ספציפית והצגת המידע עבור 12 חודשים
// // ii. בחירת טווח שנים
// // iii. 5 שנים אחרונות )מהשנה האחרונה(
// // iv. 10 שנים אחרונות )מהשנה האחרונה
// // b. תצוגה: גרפים עם אפשרויות סינון

// const IncidentTrends = () => {
//   const [attackData, setAttackData] = useState<
//     {
//       _id: {
//         year: number;
//         month: number;
//       };
//       count: number;
//     }[]
//   >([]);
//   const [year, setYear] = useState<string>("");
//   const [month, setMonth] = useState<string>("");
//   const [from_to] = useState<string[]>([]);

//   const setFrom_to = (from?: string, to?: string) => {
//     from ? (from_to[0] = from) : "";
//     to ? (from_to[1] = to) : "";
//   };

//   const fetchData = async (
//     year?: string,
//     month?: string,
//     from_to?: string[]
//   ) => {
//     try {
//       if(!year && !month && !from_to) return;
//       const response = await fetch(
//         `http://localhost:1313/api/analysis/incident-trends${
//           year
//             ? month
//               ? `?year=${year}&month=${month}`
//               : `?year=${year}`
//             : from_to
//             ? `?from=${from_to[0]}&to=${from_to[1]}`
//             : ""
//         }`
//       );
//       const data = await response.json();
//       setAttackData(data.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const heandleLastYears = (sumYears: number) => {
//     const now = new Date();
//     const lastYears = now.getFullYear() - sumYears;
//     setFrom_to(lastYears.toString(), now.getFullYear().toString());
//   };

//   const data = {
//     labels: attackData.map((item) => `${item._id.year}-${item._id.month ? item._id.month : ""}`),
//     datasets: [
//       {
//         label: "תקריות",
//         data: attackData.map((item) => item.count),
//         fill: false,
//         backgroundColor: "rgb(75, 192, 192)",
//         borderColor: "rgba(75, 192, 192, 0.2)",
//         tension: 0.5,
//       },
//     ],
//   };

//   useEffect(() => {
//     fetchData("1970", "6");
//   }, []);

//   useEffect(() => {
//     console.log({ attackData });
//   }, [attackData]);

//   return (
//     <div className="incidentTrends">
//       <div className="filter">
//         <input
//           type="text"
//           placeholder="שנה"
//           value={year}
//           onChange={(e) => setYear(e.target.value)}
//         />
//         <select
//           value={month}
//           onChange={(e) => setMonth(e.target.value)}
//         >
//           <option value="">חודש</option>
//           <option value="1">ינואר</option>
//           <option value="2">פברואר</option>
//           <option value="3">מרץ</option>
//           <option value="4">אפריל</option>
//           <option value="5">מאי</option>
//           <option value="6">יוני</option>
//           <option value="7">יולי</option>
//           <option value="8">אוגוסט</option>
//           <option value="9">ספטמבר</option>
//           <option value="10">אוקטובר</option>
//           <option value="11">נובמבר</option>
//           <option value="12">דצמבר</option>
//         </select>

//         <input
//           type="text"
//           placeholder="from"
//           value={from_to[0]}
//           onChange={(e) => setFrom_to(e.target.value, from_to[1])}
//         />
//         <input
//           type="text"
//           placeholder="to"
//           value={from_to[1]}
//           onChange={(e) => {setFrom_to(from_to[0], e.target.value), setMonth(""), setYear("")}}
//         />
//         <button onClick={() => {fetchData(year, month, from_to) , setMonth(""), setYear(""), setFrom_to("")}}>🔍</button>
//         <button onClick={() => heandleLastYears(10)}>10 שנים אחרונות</button>
//         <button onClick={() => heandleLastYears(5)}>5 שנים אחרונות</button>

//       </div>
//       <div className="graf">
//         <h1>Line Chart</h1>
//         <Line data={data} className="line" />
//       </div>
//     </div>
//   );
// };

// export default IncidentTrends;

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const IncidentTrends = () => {
  const [attackData, setAttackData] = useState<
    { _id: { year: number; month: number }; count: number }[]
  >([]);
  const [year, setYear] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [fromTo, setFromTo] = useState<string[]>(["", ""]);

  const fetchData = async (
    year?: string,
    month?: string,
    fromTo?: string[]
  ) => {
    try {
      if (!year && !month && !fromTo) return;
      const response = await fetch(
        `http://localhost:1313/api/analysis/incident-trends${
          year
            ? month
              ? `?year=${year}&month=${month}`
              : `?year=${year}`
            : fromTo
            ? `?from=${fromTo[0]}&to=${fromTo[1]}`
            : ""
        }`
      );
      const data = await response.json();
      setAttackData(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const heandleLastYears = (sumYears: number) => {
    const now = new Date();
    const lastYears = now.getFullYear() - sumYears;
    setFromTo([lastYears.toString(), now.getFullYear().toString()]);
  };

  const data = {
    labels: attackData.map(
      (item) => `${item._id.year}-${item._id.month ? item._id.month : ""}`
    ),
    datasets: [
      {
        label: "תקריות",
        data: attackData.map((item) => item.count),
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.5,
      },
    ],
  };

  useEffect(() => {
    fetchData("1970", "6");
  }, []);

  useEffect(() => {
    console.log({ attackData });
  }, [attackData]);

  return (
    <div className="incidentTrends">
      <div className="filter">
        <input
          type="text"
          placeholder="שנה"
          value={year}
          onChange={(e) => {setYear(e.target.value), setMonth(""), setFromTo(["", ""])}}
        />
        <select value={month} onChange={(e) => {setMonth(e.target.value), setFromTo(["", ""])}}>
          <option value="">חודש</option>
          <option value="1">ינואר</option>
          <option value="2">פברואר</option>
          <option value="3">מרץ</option>
          <option value="4">אפריל</option>
          <option value="5">מאי</option>
          <option value="6">יוני</option>
          <option value="7">יולי</option>
          <option value="8">אוגוסט</option>
          <option value="9">ספטמבר</option>
          <option value="10">אוקטובר</option>
          <option value="11">נובמבר</option>
          <option value="12">דצמבר</option>
        </select>

        <input
          type="text"
          placeholder="from"
          value={fromTo[0]}
          onChange={(e) => {setFromTo([e.target.value, fromTo[1]]), setMonth(""), setYear("")}}
        />
        <input
          type="text"
          placeholder="to"
          value={fromTo[1]}
          onChange={(e) => {setFromTo([fromTo[0], e.target.value]), setMonth(""), setYear("")}}
        />
        <button onClick={() => {fetchData(year, month, fromTo), setMonth(""), setYear(""), setFromTo(["", ""])}}>🔍</button>
        <button onClick={() => heandleLastYears(10)}>10 שנים אחרונות</button>
        <button onClick={() => heandleLastYears(5)}>5 שנים אחרונות</button>
      </div>
      <div className="graf">
        <h1>Line Chart</h1>
        <Line data={data} className="line" />
      </div>
    </div>
  );
};

export default IncidentTrends;
