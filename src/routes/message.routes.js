import { Router } from "express";
import { getConversations } from "../controllers/message.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/conversations", authMiddleware, getConversations);

export default router;
