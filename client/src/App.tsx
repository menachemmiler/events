import { Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
// import { socket } from "./socket/io";
import DeadliestAttackTypes from "./components/DeadliestAttackTypes";
import IncidentTrends from "./components/IncidentTrends";
import HighestCasualtyRegions from "./components/HighestCasualtyRegions";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Menu />} />
        <Route
          path="deadliest-attack-types"
          element={<DeadliestAttackTypes />}
        />
        <Route path="highest-casualty-regions" element={<HighestCasualtyRegions />} />
        <Route path="incident-trends" element={<IncidentTrends />} />

      </Routes>
    </>
  );
}

export default App;



// enum TypeShow{
//     map = "map",
//     graf = "graf"
// }
// const [currTypeShow, setCurrTypeShow] = useState<TypeShow>(TypeShow.graf);