import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function Header() {
  const navigate = useNavigate();


  const heandleAttackTypes = async () => {
    navigate("/pages/attack-types");
  };


  return (
    <div className="header">
      <Button onClick={heandleAttackTypes}>הצג לפי סוג אירוע</Button>
    </div>
  );
}
