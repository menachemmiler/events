import * as React from "react";
import { useLocation } from "react-router-dom";

export default function Table() {
  // קבלת הנתונים שהועברו דרך React Router
  const location = useLocation();
  const { selectedAttacks } = location.state || { selectedAttacks: [] };

  return (
    <div className="attack-table-page">
      <h2>התקפות נבחרות</h2>
      {/* טבלה המציגה את הנתונים */}
      <table>
        <thead>
          <tr>
            <th>סוג התקפה</th>
            <th>מספר התקפות</th>
          </tr>
        </thead>
        <tbody>
          {selectedAttacks.length === 0 ? (
            <tr>
              <td colSpan={2}>לא נבחרו התקפות</td>
            </tr>
          ) : (
            selectedAttacks.map((attack: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
              <tr key={index}>
                <td>{attack}</td>
                <td>{Math.floor(Math.random() * 100)}</td> {/* נתון דמוי-אקראי */}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
