import express from "express";
import cors from "cors";
import "dotenv/config";
import sidController from "./controllers/sid";
import analysisController from "./controllers/analysis";

import { connectToMongo } from "./config/db";

const PORT = process.env.PORT || 3000;

import http from "http";
import { Server } from "socket.io";

const app = express();
connectToMongo();

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*", // כתובת הלקוח
    methods: "*",
  },
});
import "./socket/io";//מייבא את הקובץ של הסוקטים

app.use(express.json());
app.use(cors());

app.use("/api", sidController);
app.use("/api/analysis", analysisController);



server.listen(PORT, () => {
  console.log(`Server started, Visit "http://localhost:${PORT}"`);
});