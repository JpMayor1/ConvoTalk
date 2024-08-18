import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";
import messageRoutes from "./routes/message.routes";
import userRoutes from "./routes/user.routes";

import { app, server } from "./socket/socket";
import connectToMongoDB from "./db/db.connect";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
