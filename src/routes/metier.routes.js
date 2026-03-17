import express from "express";
import {getAllMetier} from "../controllers/metier.controller.js";

const router = express.Router();

router.get("/", getAllMetier);

export default router;