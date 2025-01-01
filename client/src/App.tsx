import { Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import DeadliestAttackTypes from "./components/DeadliestAttackTypes";
import IncidentTrends from "./components/IncidentTrends";
import HighestCasualtyRegions from "./components/HighestCasualtyRegions";
import NewAttack from "./components/NewAttack";
import { useEffect } from "react";
import { socket } from "./socket/io";
import GroupsByYear from "./components/GroupsByYear";
import AllRegions from "./components/allRegions";

function App() {
  useEffect(() => {
    socket.on("newAttack", (data) => {
      console.log({ data });
    });
  }, []);
  
  return (
    <>
      <Routes>
        <Route index element={<Menu />} />
        <Route path="newAttack" element={<NewAttack />} />

        <Route
          path="deadliest-attack-types"
          element={<DeadliestAttackTypes />}
        />
        <Route
          path="highest-casualty-regions"
          element={<HighestCasualtyRegions />}
        />
        <Route path="groups-by-year" element={<GroupsByYear />} />
        <Route path="incident-trends" element={<IncidentTrends />} />
        <Route path="all-regions" element={<AllRegions/>}/>
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
