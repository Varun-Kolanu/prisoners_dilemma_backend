import ErrorHandler from "../middlewares/error.js";
import { Game } from "../models/game.js";
import { Strategy } from "../models/strategy.js";
import { Tournament } from "../models/tournament.js";
import { compile } from "../utils/compile.js";
import { getCheckerCode, getGameCode } from "../utils/getCode.js";

export const createStrategy = async (req, res, next) => {
    try {
        let { tournamentId, code, name } = req.body;

        const tournament = await Tournament.findById(tournamentId);
        if (!tournament) return next(new ErrorHandler("No tournament found", 404));

        const existingStrategy = await Strategy.findOne({ tournament: tournamentId, name });
        if (existingStrategy) return next(new ErrorHandler("Strategy with the same name already exists", 409));

        const checkerCode = getCheckerCode(code);
        const returnValue = await compile(checkerCode);
        if (returnValue.stderr) {
            return next(new ErrorHandler("Your code failed to compile", 400));
        }
        if (returnValue.output !== "0" && returnValue.output !== "1") {
            return next(new ErrorHandler("Your function returned invalid output", 400));
        }

        let strategies = await Strategy.find({ tournament: tournamentId }).select("+code");
        if (strategies.length === 0) {
            return res.status(201).json({
                message: "Yours is the first strategy",
            });
        }

        let score = 0,
            gamesPlayed = 0,
            gamesToInsert = [],
            strategiesToUpdate = [];

        console.log("Hi")

        strategies.forEach(async (existingStrategy) => {
            console.log(existingStrategy.name);
            const gameCode = getGameCode(tournament.rounds, code, existingStrategy.code);

            const returnValue = await compile(gameCode);
            console.log(returnValue)
            if (returnValue.stderr) {
                throw new ErrorHandler("Your code failed to compile", 400);
            }

            const result = JSON.parse(returnValue.output);

            gamesToInsert.push({
                strategy1: name,
                strategy1_score: result[0],
                strategy2: existingStrategy.name,
                strategy2_score: result[1],
                winner: result[2] === 1 ? name : existingStrategy.name,
                tournament: tournamentId,
            });

            score = (score * gamesPlayed + result[0]) / (gamesPlayed + 1);
            const updatedOpponentScore =
                (existingStrategy.score * existingStrategy.games_played + result[1]) /
                (existingStrategy.games_played + 1);

            strategiesToUpdate.push({
                updateOne: {
                    filter: { _id: existingStrategy._id },
                    update: {
                        $set: {
                            score: updatedOpponentScore,
                            games_played: existingStrategy.games_played + 1,
                        },
                    },
                },
            });

            gamesPlayed++;
        });
        console.log("Hi")

        await Game.insertMany(gamesToInsert);

        if (strategiesToUpdate.length > 0) {
            await Strategy.bulkWrite(strategiesToUpdate);
        }

        code = code.replace("player", "opponent");
        const createdStrategy = await Strategy.create({
            user: req.user._id,
            name,
            tournament: tournamentId,
            code,
            score,
            games_played: gamesPlayed,
        });

        return res.status(201).json(createdStrategy);
    } catch (error) {
        next(error);
    }
};


export const getStrategies = async (req, res, next) => {
    try {
        const { tournamentId } = req.params;
        const tournament = await Tournament.findById(tournamentId)
        if (!tournament) return next(new ErrorHandler("No tournament found", 404))

        const strategies = await Strategy.find({ tournament: tournamentId })
        res.status(200).json(strategies)
    } catch (error) {
        next(error)
    }
}

export const getGames = async (req, res, next) => {
    try {
        const { tournamentId } = req.params;
        const tournament = await Tournament.findById(tournamentId)
        if (!tournament) return next(new ErrorHandler("No tournament found", 404))

        const games = await Game.find({ tournament: tournamentId })
        res.status(200).json(games)
    } catch (error) {
        next(error)
    }
}

export const getStrategy = async (req, res, next) => {
    try {
        const { strategyId } = req.params;

        const strategy = await Strategy.findById(strategyId)
        if (!strategy) return next(new ErrorHandler("No strategy found", 404))

        const tournament = await Tournament.findById(strategy.tournament)
        if (Date.now() < tournament.lastDate) {
            return next(new ErrorHandler("Tournament is not yet over", 403))
        }

        res.status(200).json(strategy)
    } catch (error) {
        next(error)
    }
}