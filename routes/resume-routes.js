import express from "express";
import * as resumeController from "../controllers/resume-controller.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, resumeController.getResumeFeedback);

export default router;
