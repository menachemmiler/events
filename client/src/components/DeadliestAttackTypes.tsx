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
import { useEffect, useState } from "react";
import SelectAllTransferList from "./SelectAllTransferList";

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
      setSelectedTypes(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log({ attackData });
  }, [attackData]);

  const chartData = {
    labels: selectedTypes.map((item) => item._id), // סוגי התקפות
    datasets: [
      {
        label: "מספר הנפגעים",
        data: selectedTypes.map((item) => item.count), // מספר הנפגעים לכל סוג התקפה
        backgroundColor: `rgba(255, 99, 132, 0.5)`,
        borderColor: "rgba(255, 99, 132, 1)",
        // borderWidth: 1,
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
        <SelectAllTransferList
          leftItems={attackData}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
        />{" "}
        {/* {attackData.map((type) => (
          <div key={type._id}>
            <input
              type="checkbox"
              id={type._id}
              checked={selectedTypes.includes(type)}
              onChange={() => {
                if (selectedTypes.includes(type)) {
                  setSelectedTypes(selectedTypes.filter((t) => t !== type));
                } else {
                  setSelectedTypes([...selectedTypes, type]);
                }
              }}
            />
            <label htmlFor={type._id}>{type._id}</label>
          </div>
        ))} */}
      </div>

      <div className="graf">
        <h1>גרף סוגי התקפות</h1>
        <Bar options={options} data={chartData} className="bar" />
      </div>
    </div>
  );
};

export default DeadliestAttackTypes;
