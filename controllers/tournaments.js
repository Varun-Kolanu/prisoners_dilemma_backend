import { Tournament } from "../models/tournament.js";
import { convertToDate } from "../utils/utils.js";

export const createTournament = async (req, res) => {
    try {
        if (req.user.role != "admin") return res.status(401).json({
            error: "Only admins can create tournaments"
        })
        let { name, lastDate, rounds } = req.body;
        lastDate = convertToDate(lastDate)
        const tournament = await Tournament.findOne({ name })
        if (tournament) return res.status(409).json({
            error: "Tournament with the same name already exists"
        })
        await Tournament.create({
            name,
            lastDate,
            rounds
        })
        res.status(201).json({ message: "Tournament created successfully" });
    } catch (error) {
        next(error)
    }
}

export const deleteTournament = async (req, res) => {
    try {
        if (req.user.role != "admin") return res.status(401).json({
            error: "Only admins can delete tournaments"
        })
        const { id } = req.params;
        await Tournament.findByIdAndDelete(id)
            .then(() => res.status(200).json({ message: "Tournament deleted successfully" }))
            .catch(error => res.status(500).json({ error }));
    } catch (error) {
        next(error)
    }
}

export const getTournaments = async (req, res) => {
    try {
        const tournaments = await Tournament.find();
        res.json(tournaments);
    } catch (error) {
        next(error)
    }
}

export const getTournament = async (req, res) => {
    try {
        const { id } = req.params;
        const tournament = await Tournament.findById(id);
        if (!tournament) return res.status(404).json({ error: "Tournament not found" });
        res.json(tournament);
    } catch (error) {
        next(error)
    }
}