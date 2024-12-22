import { Link } from "react-router-dom"

const Menu = () => {
  return (
    <div className="menu">
      <Link to={"/newAttack"}>צור אירוע חדש</Link>
      <Link to={"/pages"}>הצג פרטי אירועים</Link>

    </div>
  )
}

export default Menu
