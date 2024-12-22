import { Outlet } from "react-router-dom";
import Nav from "./Nav";

const AttackTypes = () => {


  return (
    <>
      <Nav />
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};

export default AttackTypes;
