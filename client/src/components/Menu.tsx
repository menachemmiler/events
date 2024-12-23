import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="menu">
      <Link to={"deadliest-attack-types"}>סוגי ההתקפה הקטלניים ביותר</Link>
      <Link to={"highest-casualty-regions"}>מגמות ההתקפה הקטלניים ביותר</Link>

      <Link to={"incident-trends"}>מגמות אירועים</Link>
    </div>
  );
};

export default Menu;
