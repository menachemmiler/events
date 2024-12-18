import { io } from "../app";

io.on("connection", (socket) => {
  console.log("A user connected"); // הדפסת התחברות לקוח


  socket.on("disconnect", () => {
    console.log("A user disconnected"); // הדפסת התנתקות לקוח
  });
});
