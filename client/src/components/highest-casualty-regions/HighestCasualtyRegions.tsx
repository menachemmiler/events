import { Outlet } from "react-router-dom";
import Nav_highest from "./Nav_highest";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import React, { useEffect } from "react";
import { getAttacks } from "../../redux/slices/attackSlice";

const HighestCasualtyRegions = () => {
  const dispatch = useAppDispatch();
  const attacks = useAppSelector((state) => state.attack.data?.data);
  const { status } = useAppSelector((state) => state.attack);
  const [selectedAttacks, setSelectedAttacks] = React.useState<string[]>([]);

  React.useEffect(() => {
    dispatch(getAttacks("analysis/highest-casualty-regions"));
  }, []);

  useEffect(() => {
    console.log(attacks);
  }, [status]);

  const pieData1 = attacks?.map((a, index) => ({
    id: index,
    value: a.avg,
    label: a._id,
    coordinates: a.coordinates
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
      <Nav_highest />
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

export default HighestCasualtyRegions;
