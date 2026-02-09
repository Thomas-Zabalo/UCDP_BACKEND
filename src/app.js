
import express from "express";
import userRoutes from "./routes/user.routes.js";

const app = express();
app.use(express.json());

app.use("/api/user", userRoutes);

app.get("/api/ping", (req, res) => {
res.json({ status: "ok" });
});

export default app;
