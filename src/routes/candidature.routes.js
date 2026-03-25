import express from "express";
import {getMesCandidatures, postulerOffre, getCandidaturesClient, validerCandidature, refuserCandidature} from "../controllers/candidature.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/apply", authMiddleware, postulerOffre);
router.get("/me", authMiddleware, getMesCandidatures);
router.get("/client", authMiddleware, getCandidaturesClient);
router.patch("/:id/valider", authMiddleware, validerCandidature);
router.patch("/:id/refuser", authMiddleware, refuserCandidature);

export default router;