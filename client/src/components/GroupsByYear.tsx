

import { Button, Menu, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const GroupsByYear = () => {
  const [year, setYear] = useState(0);
  const [group, setGroup] = useState("");
  const [attackData, setAttackData] = useState<any[]>([
    {
      _id: {
        gname: "Unknown",
      },
      count: 113,
    },
  ]);
  const [allYears, setAllYears] = useState([]);
  const [allGroups, setAllGroups] = useState([]);

  const fetchData = async ({
    year,
    group,
  }: {
    year?: number;
    group?: string;
  }) => {
    try {
      if (!year && !group) {
        return;
      }
      const response = await fetch(
        `https://events-v85n.onrender.com/api/relationships/groups-by-year${
          year ? `?year=${year}` : group ? `?gname=${group}` : ""
        }`
      );
      const data = await response.json();
      setAttackData(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    //get all years and gnams from db
    const fetchYears = async () => {
      try {
        const res = await fetch(
          "https://events-v85n.onrender.com/api/relationships/groups-by-year"
        );
        const data = await res.json();
        setAllYears(data.data.allYears);
        setAllGroups(data.data.allGnames);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchYears();
  }, []);

  useEffect(() => {
    //get all years and gnams from db
    console.log({ allGroups });
    console.log({ allYears });
    console.log({ attackData });
  }, [allGroups, allYears, attackData]);

  const chartData = {
    labels: attackData.map((item) =>
      item._id.gname ? item._id.gname : item._id.year ? item._id.year : ""
    ),
    datasets: [
      {
        label: `${
          group ? "שנות פעילות הארגון" : year ? `כל הארגונים בשנה ${year}` : ""
        }`,
        data: attackData.map((item) => item.count),
        backgroundColor: `rgba(255, 99, 132, 0.5)`,
        borderColor: "rgba(255, 99, 132, 1)",
        // borderWidth: 1,
      },
    ],
  };

  return (
    <div className="groupsByYear">
      <div className="filter">
        {/* אפשרויות סינון:
i. בחירת שנה - הצגת הארגונים לפי מספר התקריות המשויכות לה בסדר יורד ממספר
התקריות הכי גדול להכי קטן
ii. בחירת ארגון מרשימה - הצגת התקריות לפני שנים */}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Number(year)}
          label="cdwdwdwddw"
          onChange={(e) => setYear(Number(e.target.value))}
        >
          {allYears.map((year: { _id: number }) => (
            <MenuItem key={year._id} value={year._id}>
              {year._id}
            </MenuItem>
          ))}
        </Select>
        <Button onClick={() => fetchData({ year })}>year 🔍</Button>
        <Button onClick={() => fetchData({ group })}>by gname 🌎</Button>
      </div>
      <div className="graf">
        <h1>Line Chart</h1>
        <Line data={chartData} className="line" />
      </div>
    </div>
  );
};

export default GroupsByYear;
