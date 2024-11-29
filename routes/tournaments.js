import express from "express";
import { createTournament, deleteTournament, getTournament, getTournaments } from "../controllers/tournaments.js";
import isAuthenticated from "../middlewares/auth.js";
import { getGames } from "../controllers/strategy.js";

const router = express.Router();

router.route("/").get(getTournaments).post(isAuthenticated, createTournament)
router.route("/:id").get(isAuthenticated, getTournament).delete(isAuthenticated, deleteTournament);
router.get("/games", getGames)

export default router;