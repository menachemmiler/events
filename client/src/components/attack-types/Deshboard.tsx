import { PieChart } from "@mui/x-charts/PieChart";
import { useAppSelector } from "../../redux/store";
import { DataStatus } from "../../types/redux";
import { useOutletContext } from "react-router-dom";

export default function Dashboard() {
  const { status } = useAppSelector((state) => state.attack);

  const filteredData = useOutletContext<any[]>();

  if (status === DataStatus.SUCCESS) {
    return (
      <div className="dashboard">
        <h2>דשבורד</h2>

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
