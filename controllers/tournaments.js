import { Tournament } from "../models/tournament.js";

export const createTournament = async (req, res) => {
    if (req.user.role != "admin") return res.status(401).json({
        error: "Only admins can create tournaments"
    })
    const { name, lastDate } = req.body;
    const tournament = await Tournament.findOne({name})
    if (tournament) return res.status(409).json({
        error: "Tournament with the same name already exists"
    })
    await Tournament.create({
        name,
        lastDate
    })
    res.status(201).json({ message: "Tournament created successfully" });
}

export const deleteTournament = async (req, res) => {
    if (req.user.role != "admin") return res.status(401).json({
        error: "Only admins can delete tournaments"
    })
    const { id } = req.params;
    await Tournament.findByIdAndDelete(id)
       .then(() => res.status(200).json({ message: "Tournament deleted successfully" }))
       .catch(error => res.status(500).json({ error }));
}