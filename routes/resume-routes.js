import express from "express";
import * as resumeController from "../controllers/job-controller.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, resumeController.parseResume);

export default router;
