import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import { createStrategy, getStrategies, getStrategy } from "../controllers/strategy.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createStrategy).get(getStrategies)
router.route("/:id").get(isAuthenticated, getStrategy)

export default router;