// import * as React from "react";
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
// import List from "@mui/material/List";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import Checkbox from "@mui/material/Checkbox";
// import Divider from "@mui/material/Divider";

// function intersection(a: readonly any[], b: readonly any[]) {
//   return a.filter((value) => b.includes(value));
// }

// interface SelectAllTransferListProps {
//   leftItems: any[]; // מערך של אובייקטים עם תכונה _id
//   selectedTypes: any[]; // מערך של אובייקטים נבחרים
//   setSelectedTypes: (types: any[]) => void; // הפונקציה לעדכון הבחירות
// }

// export default function SelectAllTransferList({
//   leftItems,
//   selectedTypes,
//   setSelectedTypes,
// }: SelectAllTransferListProps) {
//   const leftChecked = intersection(selectedTypes, leftItems);

//   const handleToggle = (type: any) => () => {
//     const currentIndex = selectedTypes.findIndex((t) => t._id === type._id);
//     const newChecked = [...selectedTypes];

//     if (currentIndex === -1) {
//       newChecked.push(type);
//     } else {
//       newChecked.splice(currentIndex, 1);
//     }

//     setSelectedTypes(newChecked);
//   };

//   const numberOfChecked = (items: readonly any[]) =>
//     intersection(selectedTypes, items).length;

//   const handleToggleAll = (items: readonly any[]) => () => {
//     if (numberOfChecked(items) === items.length) {
//       setSelectedTypes(selectedTypes.filter((item) => !items.includes(item)));
//     } else {
//       setSelectedTypes([
//         ...selectedTypes,
//         ...items.filter((item) => !selectedTypes.includes(item)),
//       ]);
//     }
//   };

//   const customList = (title: React.ReactNode, items: readonly any[]) => (
//     <Card>
//       <CardHeader
//         sx={{ px: 2, py: 1 }}
//         avatar={
//           <Checkbox
//             onClick={handleToggleAll(items)}
//             checked={
//               numberOfChecked(items) === items.length && items.length !== 0
//             }
//             indeterminate={
//               numberOfChecked(items) !== items.length &&
//               numberOfChecked(items) !== 0
//             }
//             disabled={items.length === 0}
//             inputProps={{
//               "aria-label": "all items selected",
//             }}
//           />
//         }
//         title={title}
//         subheader={`${numberOfChecked(items)}/${items.length} נבחרו`}
//       />
//       <Divider />
//       <List
//         sx={{
//           width: 200,
//           height: 230,
//           bgcolor: "background.paper",
//           overflow: "auto",
//         }}
//         dense
//         component="div"
//         role="list"
//       >
//         {items.map((type) => {
//           const labelId = `transfer-list-all-item-${type._id}-label`;

//           return (
//             <ListItemButton
//               key={type._id}
//               role="listitem"
//               onClick={handleToggle(type)}
//             >
//               <ListItemIcon>
//                 <Checkbox
//                   checked={selectedTypes.some(
//                     (selected) => selected._id === type._id
//                   )}
//                   tabIndex={-1}
//                   disableRipple
//                   inputProps={{
//                     "aria-labelledby": labelId,
//                   }}
//                 />
//               </ListItemIcon>
//               <ListItemText id={labelId} primary={type._id} />
//             </ListItemButton>
//           );
//         })}
//       </List>
//     </Card>
//   );

//   return (
//     <Grid
//       style={{ direction: "rtl" }}
//       container
//       spacing={2}
//       sx={{ justifyContent: "center", alignItems: "center" }}
//     >
//       {/* רק את ה-List הראשון (הנגלל) */}
//       <Grid item>{customList("בחירות לסינון/הצגה", leftItems)}</Grid>
//     </Grid>
//   );
// }


import * as React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";

function intersection(a: readonly any[], b: readonly any[]) {
  return a.filter((value) => b.includes(value));
}

interface SelectAllTransferListProps {
  leftItems: any[]; // מערך של אובייקטים עם תכונה _id
  selectedTypes: any[]; // מערך של אובייקטים נבחרים
  setSelectedTypes: (types: any[]) => void; // הפונקציה לעדכון הבחירות
}

export default function SelectAllTransferList({
  leftItems,
  selectedTypes,
  setSelectedTypes,
}: SelectAllTransferListProps) {

  const handleToggle = (type: any) => () => {
    const currentIndex = selectedTypes.findIndex((t) => t._id === type._id);
    const newChecked = [...selectedTypes];

    if (currentIndex === -1) {
      newChecked.push(type);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedTypes(newChecked);
  };

  const numberOfChecked = (items: readonly any[]) =>
    intersection(selectedTypes, items).length;

  const handleToggleAll = (items: readonly any[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setSelectedTypes(selectedTypes.filter((item) => !items.includes(item)));
    } else {
      setSelectedTypes([
        ...selectedTypes,
        ...items.filter((item) => !selectedTypes.includes(item)),
      ]);
    }
  };

  const customList = (title: React.ReactNode, items: readonly any[]) => (
    <Card sx={{ width: "auto" }}> {/* הרוחב יתואם אוטומטית לתוכן */}
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "all items selected",
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} נבחרו`}
      />
      <Divider />
      <List
        sx={{
          maxHeight: 230, // גובה קבוע
          overflow: "auto", // גלילה רק אם יש יותר מדי פריטים
          width: "100%", // הרוחב יתפוס 100% מהמיכל
          bgcolor: "background.paper",
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((type) => {
          const labelId = `transfer-list-all-item-${type._id}-label`;

          return (
            <ListItemButton
              key={type._id}
              role="listitem"
              onClick={handleToggle(type)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={selectedTypes.some(
                    (selected) => selected._id === type._id
                  )}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={type._id} />
            </ListItemButton>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Grid
      container
      spacing={2}
      sx={{ justifyContent: "center", alignItems: "center", direction: "rtl" }}
    >
      {/* רק את ה-List הראשון (הנגלל) */}
      <Grid item>{customList("בחירות לסינון/הצגה", leftItems)}</Grid>
    </Grid>
  );
}
