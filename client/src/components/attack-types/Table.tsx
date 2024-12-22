import React from "react";
import { useOutletContext } from "react-router-dom";

const Table: React.FC = () => {
  const data = useOutletContext<any[]>();

  if (!data || data.length === 0) {
    return <div>אין נתונים להצגה</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>שם</th>
          <th>ערך</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.label}</td>
            <td>{item.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
