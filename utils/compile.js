import axios from "axios";
import ErrorHandler from "../middlewares/error.js";

export const compile = async (code) => {
    try {
        const language = "c++"
        let languageMap = {
            "c++": { language: "c++", version: "10.2.0" },
        };

        if (!languageMap[language]) {
            throw new ErrorHandler("Unsupported language", 400);
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

        const response = await axios(config)
        return response.data.run;
    } catch (error) {
        throw new ErrorHandler(error, 500);
    }
}