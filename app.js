import express from "express";
import { config } from "dotenv";
import {errorMiddleware} from "./middlewares/error.js";
import cors from "cors"
import axios from "axios";
import tournamentRouter from "./routes/tournaments.js";
import userRouter from "./routes/user.js";

export const app = express();
config({});

app.use(express.json());
app.use(
    cors({
        origin: ["*"],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
    }));

app.post("/compile", (req, res) => {

    const {code, language } = req.body;

    let languageMap = {
        "c++": { language: "c++", version: "10.2.0" },
        "python": { language: "python", version: "3.10.0" },
        "javascript": { language: "javascript", version: "18.15.0" }
    };

    if (!languageMap[language]) {
        return res.status(400).send({ error: "Unsupported language" });
    }

    let data = {
        "language": languageMap[language].language,
        "version": languageMap[language].version,
        "files": [
            {
                "name": "main",
                "content": code
            }
        ],
    };

    let config = {
        method: 'post',
        url: 'https://emkc.org/api/v2/piston/execute',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then((response) => {
            res.json(response.data.run);  
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
            res.status(500).send({ error: "Something went wrong" });
        });
});

app.use("/tournaments", tournamentRouter)
app.use("/users", userRouter)

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(errorMiddleware);