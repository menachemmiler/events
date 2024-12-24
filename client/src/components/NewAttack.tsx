import {  useState } from "react";
import { socket } from "../socket/io";
import { newEventDTO } from "../DTO/newEventDTO";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const NewAttack = () => {
  const [newAttack, setNewAttack] = useState<newEventDTO>({} as newEventDTO);



  const heandleSubmit = async () => {
    if (!newAttack) throw new Error("Missing info!");
    socket.emit("newAttack", newAttack);
  };

  return (
    <div className="newAttack">
      {/* <h1>הוסף אירוע חדש</h1> */}
      <div className="center">
        <TextField
          label="שנה"
          type="number"
          onChange={(e) =>
            setNewAttack({ ...newAttack, iyear: parseInt(e.target.value) })
          }
          size="small"
        />

        <TextField
          label="חודש"
          type="number"
          onChange={(e) =>
            setNewAttack({ ...newAttack, imonth: parseInt(e.target.value) })
          }
          size="small"
        />

        <TextField
          label="יום"
          type="number"
          onChange={(e) =>
            setNewAttack({ ...newAttack, iday: parseInt(e.target.value) })
          }
          size="small"
        />

        <TextField
          label="מדינה"
          onChange={(e) =>
            setNewAttack({ ...newAttack, country_txt: e.target.value })
          }
          size="small"
        />

        <TextField
          label="אזור"
          onChange={(e) =>
            setNewAttack({ ...newAttack, region_txt: e.target.value })
          }
          size="small"
        />

        <TextField
          label="עיר"
          onChange={(e) => setNewAttack({ ...newAttack, city: e.target.value })}
          size="small"
        />

        <TextField
          label="קו רוחב"
          type="number"
          onChange={(e) =>
            setNewAttack({ ...newAttack, latitude: parseInt(e.target.value) })
          }
          size="small"
        />

        <TextField
          label="קו אורך"
          type="number"
          onChange={(e) =>
            setNewAttack({ ...newAttack, longitude: parseInt(e.target.value) })
          }
          size="small"
        />

        <TextField
          label="סוג התקפה"
          onChange={(e) =>
            setNewAttack({ ...newAttack, attacktype1_txt: e.target.value })
          }
          size="small"
        />

        <TextField
          label="סוג יעד"
          onChange={(e) =>
            setNewAttack({ ...newAttack, targtype1_txt: e.target.value })
          }
          size="small"
        />

        <TextField
          label="יעד"
          onChange={(e) =>
            setNewAttack({ ...newAttack, target1: e.target.value })
          }
          size="small"
        />

        <TextField
          label="שם קבוצת התקפה"
          onChange={(e) =>
            setNewAttack({ ...newAttack, gname: e.target.value })
          }
          size="small"
        />

        <TextField
          label="סוג נשק"
          onChange={(e) =>
            setNewAttack({ ...newAttack, weaptype1_txt: e.target.value })
          }
          size="small"
        />

        <TextField
          label="הרוגים"
          type="number"
          onChange={(e) =>
            setNewAttack({ ...newAttack, nkill: parseInt(e.target.value) })
          }
          size="small"
        />

        <TextField
          label="פצועים"
          type="number"
          onChange={(e) =>
            setNewAttack({ ...newAttack, nwound: parseInt(e.target.value) })
          }
          size="small"
        />

        <TextField
          label="סכום כופר"
          type="number"
          onChange={(e) =>
            setNewAttack({ ...newAttack, ransomamt: parseInt(e.target.value) })
          }
          size="small"
        />

        <TextField
          label="סיכום"
          onChange={(e) =>
            setNewAttack({ ...newAttack, summary: e.target.value })
          }
          size="small"
        />

        <TextField
          label="מספר תוקפים"
          type="number"
          onChange={(e) =>
            setNewAttack({ ...newAttack, nperps: parseInt(e.target.value) })
          }
          size="small"
        />
      </div>
      <Button
        className="button"
        variant="contained"
        color="primary"
        onClick={heandleSubmit}
        size="small"
      >
        הוסף
      </Button>
    </div>
  );
};

export default NewAttack;
