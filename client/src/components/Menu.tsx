import ActionAreaCard from "./ActionAreaCard";

const Menu = () => {
  return (
    <div className="menu">
      <button className="gif" onClick={() => (window.location.href = "/newAttack")}>
        עדכן אירוע חדש
      </button>
      <div className="center">
        <ActionAreaCard
          imgName="attackType.png"
          linkTo="deadliest-attack-types"
          text="סוגי ההתקפה הקטלניים ביותר"
          title="נִתוּחַ"
        />
        <ActionAreaCard
          imgName="DeadliestAttackTypes.png"
          linkTo="highest-casualty-regions"
          text="מגמות ההתקפות הקטלניים ביותר לפי איזורים"
          title="נִתוּחַ"
        />
        <ActionAreaCard
          imgName="IncidentTrends.png"
          linkTo="incident-trends"
          text="מגמות אירועים"
          title="נִתוּחַ"
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
