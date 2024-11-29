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
    rounds: {
        type: Number,
        required: true
    }
})

export const Tournament = mongoose.model("Tournament", tournamentSchema);