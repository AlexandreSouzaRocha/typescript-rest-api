import express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";

import Routes from "./routes/routes";

class App {
    app: express.Application;

    constructor() {
        this.app = express();
        this.middleware();
        this.bodyParser();
        this.routes();
    }

    private routes(): void {
        this.app.use("/v1", Routes);
    }

    private middleware(): void {
        this.app.use(cors());
    }
    private bodyParser(): void {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use((request, response, next) => {
            bodyParser.json()(request, response, (err) => {
                if (err) {
                    return response.status(400).send({ message: "Invalid JSON syntax." });
                }
                next();
            });

        });
    }
}
export default new App().app;