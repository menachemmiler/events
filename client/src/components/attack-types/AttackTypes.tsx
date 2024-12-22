import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import React from "react";
import { getAttacks } from "../../redux/slices/attackSlice";

const AttackTypes = () => {
  const dispatch = useAppDispatch();
  const attacks = useAppSelector((state) => state.attack.data?.data);
  const { status } = useAppSelector((state) => state.attack);
  const [selectedAttacks, setSelectedAttacks] = React.useState<string[]>([]);

  React.useEffect(() => {
    dispatch(getAttacks("analysis/deadliest-attack-types"));
  }, []);

  const pieData1 = attacks?.map((a, index) => ({
    id: index,
    value: a.count,
    label: a._id,
  }));

  const filteredData = pieData1?.filter((item) =>
    selectedAttacks.includes(item.label)
  );

  const handleCheckboxChange = (label: string) => {
    setSelectedAttacks((prevSelected) =>
      prevSelected.includes(label)
        ? prevSelected.filter((item) => item !== label)
        : [...prevSelected, label]
    );
  };

  return (
    <>
      <Nav />
      <div className="content">
        <div className="checkboxes">
          {attacks?.map((attack) => (
            <label key={attack._id}>
              <input
                type="checkbox"
                checked={selectedAttacks.includes(attack._id)}
                onChange={() => handleCheckboxChange(attack._id)}
              />
              {attack._id}
            </label>
          ))}
        </div>
        <Outlet context={filteredData} />
      </div>
    </>
  );
};

export default AttackTypes;
