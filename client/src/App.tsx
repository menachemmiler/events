import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import Pages from "./components/Pages";
import Table from "./components/attack-types/Table";
import Deshboard from "./components/attack-types/Deshboard";
import AttackTypes from "./components/attack-types/AttackTypes";

function App() {
  return (
    <div className="app">
      {/* <Pages /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="pages" element={<Pages />}>
            <Route path="attack-types" element={<AttackTypes />}>
              <Route path="table" element={<Table />} />
              <Route index element={<Deshboard />} />
            </Route>
            {/* <Route path="orders" element={<OrdersList />} />
            <Route path="inventory" element={<InventoryList />} />
            <Route path="charts" element={<Deshboard />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
