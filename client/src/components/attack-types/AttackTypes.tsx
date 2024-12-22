import { Outlet } from "react-router-dom";
import Nav from "./Nav";

const AttackTypes = () => {
  return (
    <>
      <Nav />
      <div className="content">
        <Outlet context={[1, 2]}/>
      </div>
    </>
  );
};

export default AttackTypes;
