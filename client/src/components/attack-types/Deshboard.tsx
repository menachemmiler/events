import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { DataStatus } from "../../types/redux";
import { getAttacks } from "../../redux/slices/attackSlice";

export default function Dashboard() {
  const dispatch = useAppDispatch();

  const attacks = useAppSelector((state) => state.attack.data?.data);
  const { status } = useAppSelector((state) => state.attack);

  React.useEffect(() => {
    dispatch(getAttacks("analysis/deadliest-attack-types"));
  }, []);



  status == DataStatus.LOADING && <>dccbdhb</>

  // אם המידע התקבל בהצלחה
  if (status === DataStatus.SUCCESS) {
    // גרף 1 - התקפות מסוגים שונים
    const pieData1 = attacks?.map((a, index) => ({
      id: index,
      value: a.count,
      label: a._id,
    }));

    return (
      <div className="dashboard">
        dashboard
        <PieChart series={[{ data: pieData1 ?? []}]} width={500} height={300} />
      </div>
    );
  }

  // במקרה של כשלון בהבאת המידע, אפשר להחזיר הודעת שגיאה או לטעון נתונים
  return <div>טעינת נתונים...</div>;
}
