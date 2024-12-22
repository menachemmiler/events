import { useNavigate } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { IoStatsChartOutline } from "react-icons/io5";

export default function Nav() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  const navigate = useNavigate();

  const heandleShowTable = async () => {
    // dispatch(getAllOrders())
    navigate("/pages/attack-types/table");
  };

  const heandleShowDashboard = async () => {
    navigate("/pages/attack-types");
  };

  return (
    <div className="nav">
      <Box sx={{ width: "100%", maxWidth: 360 }}>
        <List component="nav" aria-label="main mailbox folders">
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => {
              heandleShowDashboard();
              handleListItemClick(event, 0);
            }}
          >
            <ListItemIcon>
              <IoStatsChartOutline size={30} />
            </ListItemIcon>
            <ListItemText primary="דשבורד" />
          </ListItemButton>

          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => {
              heandleShowTable();
              handleListItemClick(event, 1);
            }}
          >
            <ListItemIcon>
              <HiOutlineClipboardDocumentList size={30} />
            </ListItemIcon>
            <ListItemText primary="הצג בטבלה" />
          </ListItemButton>

          {/* <Divider />   */}
        </List>
      </Box>
    </div>
  );
}
