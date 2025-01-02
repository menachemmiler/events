import { Autocomplete, Button, IconButton, TextField } from "@mui/material";
import { Position } from "../DTO/position";
import MyMap from "./MyMap";
import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import grafImg from "../assets/graf.png";
import lineGrafImg from "../assets/lineGraf.png";

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
  const [displayBaf, setBar] = useState<"block" | "none">("block");
  const [displayLine, setLine] = useState<"block" | "none">("none");
  const [grafSize, setGrafSize] = useState<boolean>(false);

  const setDisplayGraf = () => {
    if (displayBaf == "block") {
      setBar("none");
      setLine("block");
    } else {
      setBar("block");
      setLine("none");
    }
  };

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
    labels: attackData.map((item) => item._id),
    datasets: [
      {
        label: top
          ? `חמשת הבולטים ${currRegeion?.region_txt}`
          : `כל הארגונים ב-${currRegeion?.region_txt}`,
        data: attackData.map((item) => item.count),
        backgroundColor:  `#e6cc96`,
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
        <div
          className={`left`}
          style={grafSize ? { width: "96%" } : { zIndex: 0 }}
        >
          <Line
            style={{ display: `${displayLine}` }}
            data={chartData}
            className="line"
          />
          <Bar
            style={{ display: `${displayBaf}` }}
            data={chartData}
            className="bar"
          />
          <IconButton
            aria-label="delete"
            size="large"
            className="changeGraf"
            onClick={setDisplayGraf}
          >
            <img
              src={displayBaf == "none" ? grafImg : lineGrafImg}
              title={displayBaf == "none" ? "הצג ב-עמודות גרף" :  "הצג ב-תרשים גרף"}
              alt="graf img"
              width={"15px"}
            />
          </IconButton>
          <Button
            variant="outlined"
            className="changeSize"
            onClick={() => {
              setGrafSize(!grafSize);
            }}
          >
            {grafSize ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrows-move"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10M.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                height="16px"
                fill="currentColor"
                className="bi bi-arrows-fullscreen"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707m0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707m-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707"
                />
              </svg>
            )}
          </Button>
        </div>
        <div className={`right ${grafSize ? "hidden" : ""}`}>
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
