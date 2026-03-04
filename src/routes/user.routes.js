import express from "express";
import { findByEmail,login, register } from "../controllers/user.controller.js";
import { registerValidator, loginValidator } from "../validators/user.validator.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = express.Router();

router.post("/test", findByEmail);
router.post("/register", registerValidator,validate,register);
router.post("/login", loginValidator,validate, login);

export default router;
