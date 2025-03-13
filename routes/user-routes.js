import express from "express";
import * as userController from "../controllers/user-controller.js";

const router = express.Router();

router.route("/register").post(userController.createUser);

router.route("/login").post(userController.fetchUser);

export default router;
