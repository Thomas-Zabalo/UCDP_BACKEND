
import express from "express";

const app = express();
app.use(express.json());

app.get("/api/ping", (req, res) => {
res.json({ status: "ok" });
});

export default app;
