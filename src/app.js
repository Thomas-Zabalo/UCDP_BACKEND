import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/messages", messageRoutes);

app.get("/api/ping", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
