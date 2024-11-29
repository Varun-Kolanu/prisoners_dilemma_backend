import express from "express";
import { config } from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors"
import tournamentRouter from "./routes/tournaments.js";
import userRouter from "./routes/user.js";
import strategyRouter from "./routes/strategy.js";

export const app = express();
config({});

app.use(express.json());
app.use(
    cors({
        origin: ["*"],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
    }));

app.use("/tournaments", tournamentRouter)
app.use("/users", userRouter)
app.use("/strategies", strategyRouter)

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(errorMiddleware);