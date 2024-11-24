import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastDate: {
        type: Date,
        required: true
    },
    winner: {
        type: String,
    }
})

export const Tournament = mongoose.model("Tournament", tournamentSchema);