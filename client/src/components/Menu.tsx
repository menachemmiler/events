import ActionAreaCard from "./ActionAreaCard";
import attackTypeImg from "../assets/attackType.png"
import DeadliestAttackTypesImg from "../assets/DeadliestAttackTypes.png"
import IncidentTrendsImg from "../assets/IncidentTrends.png"
import GroupsByYearImg from "../assets/GroupsByYear.png"


const Menu = () => {
  return (
    <div className="menu">
      <button className="gif" onClick={() => (window.location.href = "/newAttack")}>
        עדכן אירוע חדש
      </button>
      <div className="center">
        <ActionAreaCard
          imgName={attackTypeImg}
          linkTo="deadliest-attack-types"
          text="סוגי ההתקפה הקטלניים ביותר"
          title="נִתוּחַ"
        />
        <ActionAreaCard
          imgName={DeadliestAttackTypesImg}
          linkTo="highest-casualty-regions"
          text="מגמות ההתקפות הקטלניים ביותר לפי איזורים"
          title="נִתוּחַ"
        />
        <ActionAreaCard
          imgName={IncidentTrendsImg}
          linkTo="incident-trends"
          text="מגמות אירועים"
          title="נִתוּחַ"
        />
        <ActionAreaCard
          imgName={GroupsByYearImg}
          linkTo="groups-by-year"
          text="ארגונים שפעלו בשנה מסוימת עם סך התקריות"
          title="יחסים"
        />
        {/* <ActionAreaCard
          imgName="attackType.png"
          linkTo="deadliest-attack-types"
          text="סוגי ההתקפה הקטלניים ביותר"
          title="נִתוּחַ"
        /> */}
        {/* <ActionAreaCard
          imgName="attackType.png"
          linkTo="deadliest-attack-types"
          text="סוגי ההתקפה הקטלניים ביותר"
          title="נִתוּחַ"
        /> */}
      </div>
    </div>
  );
};

export default Menu;
