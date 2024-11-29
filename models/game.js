import mongoose from "mongoose";

const schema = new mongoose.Schema({
    strategy1: {
        type: String,
        required: true
    },
    strategy1_score: {
        type: Number,
        required: true
    },
    strategy2: {
        type: String,
        required: true
    },
    strategy2_score: {
        type: Number,
        required: true
    },
    winner: {
        type: String,
        required: true
    },
    tournament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tournament",
        required: true
    }

})

export const Game = mongoose.model("Game", schema)