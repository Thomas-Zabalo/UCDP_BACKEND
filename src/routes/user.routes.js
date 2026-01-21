import express from "express";
import { register, login, logout} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { registerValidator, loginValidator } from "../validators/user.validator.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = express.Router();

app.router.post("/register", registerValidator, validate, register);
router.post("/login", loginValidator, validate, login);
router.post("/logout", authMiddleware, logout);

export default router;
