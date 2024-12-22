// import { PieChart } from "@mui/x-charts/PieChart";
// import { useAppSelector } from "../../redux/store";
// import { DataStatus } from "../../types/redux";
// import { useOutletContext } from "react-router-dom";

// export default function DeshboardhHighest() {
//   const { status } = useAppSelector((state) => state.attack);

//   const filteredData = useOutletContext<any[]>();

//   const chartData = filteredData?.map((region) => (console.log({region}), {
//     id:region.id,
//     value: region.value,
//     label: region.label,
//     coordinates: region.coordinates
//   }));

//   if (status === DataStatus.SUCCESS) {
//     console.log({chartData})
//     return (
//       <div className="dashboard">
//         <h2>דשבורד</h2>

//         <PieChart
//           series={[{ data: chartData ?? [] }]}
//           width={500}
//           height={300}
//         />
//       </div>
//     );
//   }

//   return <div>טעינת נתונים...</div>;
// }

import { PieChart } from "@mui/x-charts/PieChart";
import { useAppSelector } from "../../redux/store";
import { DataStatus } from "../../types/redux";
import { useOutletContext } from "react-router-dom";

export default function DeshboardhHighest() {
  const { status } = useAppSelector((state) => state.attack);
  const filteredData = useOutletContext<any[]>();

  const chartData = filteredData?.map((region) => ({
    id: region.id,
    value: region.value,
    label: region.label, // התווית שמצורפת לכל נתון
    coordinates: region.coordinates,
  }));

  if (status === DataStatus.SUCCESS) {
    return (
      <div className="dashboard">
        <h2>דשבורד</h2>

        <PieChart
          series={[
            {
              data: chartData ?? [],
            },
          ]}
          width={500}
          height={300}
        />
      </div>
    );
  }

  return <div>טעינת נתונים...</div>;
}
