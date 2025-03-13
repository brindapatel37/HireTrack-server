import express from "express";
import * as taskController from "../controllers/job-controller.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(authenticate, taskController.getTasks)
  .post(authenticate, taskController.createTask);

router
  .route("/:id")
  .put(authenticate, taskController.updateTask)
  .delete(authenticate, taskController.deleteTask);

export default router;
