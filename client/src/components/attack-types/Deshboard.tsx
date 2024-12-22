import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { DataStatus } from "../../types/redux";
import { getAttacks } from "../../redux/slices/attackSlice";

export default function Dashboard() {
  const dispatch = useAppDispatch();

  const attacks = useAppSelector((state) => state.attack.data?.data);
  const { status } = useAppSelector((state) => state.attack);
  const [selectedAttacks, setSelectedAttacks] = React.useState<string[]>([]);

  React.useEffect(() => {
    dispatch(getAttacks("analysis/deadliest-attack-types"));
  }, [dispatch]);

  if (status === DataStatus.SUCCESS) {
    const pieData1 = attacks?.map((a, index) => ({
      id: index,
      value: a.count,
      label: a._id,
    }));

    
    // סינון התקפות לפי הבחירות של המשתמש
    const filteredData = pieData1?.filter((item) =>
      selectedAttacks.includes(item.label)
    );

    // פונקציה לעדכון הבחירות של המשתמש
    const handleCheckboxChange = (label: string) => {
      setSelectedAttacks((prevSelected) =>
        prevSelected.includes(label)
          ? prevSelected.filter((item) => item !== label)
          : [...prevSelected, label]
      );
    };

    return (
      <div className="dashboard">
        <h2>דשבורד</h2>

        <div className="checkboxes">
          {attacks?.map((attack) => (
            <label key={attack._id}>
              <input
                type="checkbox"
                checked={selectedAttacks.includes(attack._id)}
                onChange={() => handleCheckboxChange(attack._id)}
              />
              {attack._id}
            </label>
          ))}
        </div>

        <PieChart
          series={[{ data: filteredData ?? [] }]}
          width={500}
          height={300}
        />
      </div>
    );
  }

  return <div>טעינת נתונים...</div>;
}
