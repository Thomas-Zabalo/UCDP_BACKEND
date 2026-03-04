import express from "express";
import { findByEmail,login, register } from "../controllers/user.controller.js";
import { registerValidator, loginValidator } from "../validators/user.validator.js";

const router = express.Router();

router.post("/test", findByEmail);
router.post("/register", register, registerValidator);
router.post("/login", login, loginValidator);

export default router;
