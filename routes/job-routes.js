import express from "express";
import * as jobController from "../controllers/job-controller.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(authenticate, jobController.getJobs)
  .post(authenticate, jobController.createJob);

router
  .route("/:id")
  .get(authenticate, jobController.getOneJob)
  .put(authenticate, jobController.updateJob)
  .delete(authenticate, jobController.deleteJob);

export default router;
