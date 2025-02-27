import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DeadliestAttackTypes = () => {
  const [attackData, setAttackData] = useState<any[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/analysis/deadliest-attack-types`
      );
      const data = await response.json();
      setAttackData(data.data);
      setSelectedTypes(data.data); // ברירת מחדל: לבחור את כל הסוגים
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartData = {
    labels: selectedTypes.map((item) => item._id),
    datasets: [
      {
        label: "מספר הנפגעים",
        data: selectedTypes.map((item) => item.count),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="deadliestAttackTypes">
      <div className="selectTypes">
        <Autocomplete
          multiple
          options={attackData}
          getOptionLabel={(option) => option._id || ""}
          value={selectedTypes}
          onChange={(_, newValue) => setSelectedTypes(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="בחר סוגי התקפות" variant="outlined" />
          )}
        />
      </div>

      <div className="graf">
        <h1>גרף סוגי התקפות</h1>
        <Bar options={options} data={chartData} className="bar" />
      </div>
    </div>
  );
};

export default DeadliestAttackTypes;
