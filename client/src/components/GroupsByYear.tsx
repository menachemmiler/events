import {
  Autocomplete,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const GroupsByYear = () => {
  const [year, setYear] = useState("");
  const [group, setGroup] = useState("");
  const [attackData, setAttackData] = useState<any[]>([]);
  const [allYears, setAllYears] = useState([]);
  const [allGroups, setAllGroups] = useState([]);

  const fetchData = async ({
    year,
    group,
  }: {
    year?: string;
    group?: string;
  }) => {
    try {
      if (!year && !group) {
        return;
      }
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/relationships/groups-by-year${
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
          `${import.meta.env.VITE_BASE_URL}/api/relationships/groups-by-year`
        );
        const data = await res.json();
        setAllYears(data.data.allYears);
        setAllGroups(data.data.allGnames);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchYears();
  }, []);

  useEffect(() => {
    console.log({ allGroups });
    console.log({ allYears });
  }, [allGroups, allYears]);

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
        backgroundColor: `#e6cc96`,
        borderColor: "#52c1e3",
        // borderWidth: 1,
      },
    ],
  };

  return (
    <div className="groupsByYear">
      <div className="filter">
        <Autocomplete
          options={allYears}
          getOptionLabel={(option: { _id: string }) => option._id.toString()}
          onChange={(_event, newValue) => {
            setYear(newValue?._id || "");
            fetchData({ year: newValue?._id });
            setGroup("");
          }}
          renderInput={(params) => (
            <TextField 
              {...params}
              label="בחר לפי שנה"
              variant="standard"
            />
            
          )}
        />



        <Autocomplete
          options={allGroups}
          getOptionLabel={(option: { _id: string }) => option._id.toString()}
          onChange={(_event, newValue) => {
            setGroup(newValue?._id || "");
            fetchData({ group: newValue?._id });
            setYear("");
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="בחר לפי ארגון"
              variant="standard"
            />
          )}
        />
      </div>
      <div className="graf">
        <h1>הצג לפי שנה או ארגון</h1>
        <Line  data={chartData} className="line" />
      </div>
    </div>
  );
};

export default GroupsByYear;
