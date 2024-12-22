import { Outlet } from "react-router-dom";

import Header from "./Header";

function Pages() {
  return (
    <div className="pages">
      <Header />
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}

export default Pages;
