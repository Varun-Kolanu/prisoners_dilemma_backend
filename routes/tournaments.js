import express from "express";
import { createTournament, deleteTournament } from "../controllers/tournaments.js";
import isAuthenticated from "../middlewares/auth.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createTournament).delete(isAuthenticated, deleteTournament);

export default router;