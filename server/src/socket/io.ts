import { io } from "../app";
import { newEventDTO } from "../DTO/newEventDTO";
import event from "../models/event";
import { createService } from "../services/attack";

io.on("connection", (socket) => {
  console.log("A user connected"); // הדפסת התחברות לקוח

  // //סוקט ליצירת אירוע חדש
  // socket.on("newAttack", async (data: newEventDTO) => {
  //   try {
  //     const newAttack = await createService(data);
  //     console.log({ newAttack });
  
  //     //קבלת כל ההתקפות ממסד הנתונים
  //     const allAttacks = await event.find();

  //     //הודעה על 
  //     io.emit("updateAttacks", allAttacks);
  //   } catch (error: any) {
  //     console.log(error.message);
  //   }
  // });

  socket.on("disconnect", () => {
    console.log("A user disconnected"); // הדפסת התנתקות לקוח
  });
});
