import { Autocomplete, Button, TextField } from "@mui/material";
import { Position } from "../DTO/position";
import MyMap from "./MyMap";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const AllRegions = () => {
  const [allRegions, setAllRegions] = useState<
    {
      _id: string;
      region_txt: string;
      latitude: number;
      longitude: number;
    }[]
  >([]);

  const [currRegeion, setCurrRegeion] = useState<{
    _id: string;
    region_txt: string;
    latitude: number;
    longitude: number;
  }>({
    latitude: 30,
    longitude: 112.5,
    region_txt: "לא נבחר ארגון",
    _id: "1231",
  });

  const [attackData, setAttackData] = useState<
    {
      _id: string;
      count: number;
    }[]
  >([]);

  const [top, setTop] = useState<boolean>(false);

  const getAllRegons = async () => {
    try {
      const allRegions = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/analysis/all-regions`
      );
      const dataToJson: {
        description: string;
        data: [
          {
            _id: string;
            region_txt: string;
            latitude: number;
            longitude: number;
          }
        ];
      } = await allRegions.json();
      setAllRegions(dataToJson.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllRegons();
  }, []);

  useEffect(() => {
    console.log({ allRegions });
  }, [allRegions]);

  useEffect(() => {
    console.log({ currRegeion });
    if (currRegeion) {
      fetchData(currRegeion.region_txt);
    }
  }, [currRegeion]);

  useEffect(() => {
    console.log({ attackData });
  }, [attackData]);

  useEffect(() => {
    if (currRegeion?.region_txt) {
      fetchData(currRegeion?.region_txt);
    }
  }, [top]);

  const fetchData = async (region: string) => {
    if (!region) return;
    const topQuery = top ? "&&top=true" : "";
    const response = await fetch(
      `${
        import.meta.env.VITE_BASE_URL
      }/api/relationships/top-groups?region=${region}${topQuery}`
    );
    const toJson = await response.json();
    setAttackData(toJson.data);
    if (!response.ok) {
      throw new Error("Failed to fetch attack data");
    }
    const data: {
      description: string;
      data: {
        _id: string;
        count: number;
      }[];
    } = await response.json();
    return data.data;
  };

  const positions = [
    {
      position: [currRegeion?.latitude || 123, currRegeion?.longitude || 123],
      name: top
        ? `חמשת הבולטים ${currRegeion?.region_txt}`
        : `כל הארגונים ב-${currRegeion?.region_txt}`,
      dataList: attackData.map((a) => `${a._id}, כמות פיגועים ${a.count}`),
    },
  ];

  // חישוב מרכז המפה על פי הגבולות
  let centerPosition: [number, number];
  if (positions.length >= 1) {
    //אם יש כמה שיקח אותו לבעל רמת הסיכון הגבוהה ביותר
    centerPosition = positions[0].position as [number, number];
  } else {
    centerPosition = [112.5, 30];
  }

  let chartData = {
    labels: attackData.map((item) =>
     item._id
    ),
    datasets: [
      {
        label:  top
        ? `חמשת הבולטים ${currRegeion?.region_txt}`
        : `כל הארגונים ב-${currRegeion?.region_txt}`,
        data: attackData.map((item) => item.count),
        backgroundColor: `#e6cc96`,
        borderColor: "#52c1e3",
        // borderWidth: 1,
      },
    ],
  };

  return (
    <div className="allRegions">
      <div className="filter">
        <Autocomplete
          options={allRegions}
          getOptionLabel={(option: { region_txt: string }) =>
            option.region_txt.toString()
          }
          onChange={(_event, newValue) => {
            setCurrRegeion(newValue!);
            // fetchData(newValue?.region_txt as string);
          }}
          renderInput={(params) => (
            <TextField {...params} label="בחר לפי איזור" variant="standard" />
          )}
        />

        <Button onClick={() => setTop(!top)}>
          {top ? `כל הארגונים` : "חמשת הבולטים"}
        </Button>
      </div>
      <div className="main">
        <div className="left">
        <Line  data={chartData} className="line"/>
        </div>
        <div className="right">
          <MyMap
            centerPosition={centerPosition}
            initialZoom={4}
            positions={positions as unknown as Position[]}
          />
        </div>
      </div>
    </div>
  );
};

export default AllRegions;
