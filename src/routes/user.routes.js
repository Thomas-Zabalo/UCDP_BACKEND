import express from "express";
import { findByEmail,login, register } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/test", findByEmail);
router.post("/register", register);
router.post("/login", login);

export default router;
