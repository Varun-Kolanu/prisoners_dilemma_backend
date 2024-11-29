import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    tournament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tournament",
        required: true
    },
    code: {
        type: String,
        required: true,
        select: false
    },
    score: {
        type: Number,
        default: 0
    },
    games_played: {
        type: Number,
        default: 0
    }
})

export const Strategy = mongoose.model("Strategy", schema)