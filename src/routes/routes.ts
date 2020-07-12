import * as express from "express";

const Routes: express.Router = express.Router();

Routes.get("/health", (request, response) => response.status(200).send({ message: "UP", timestamp: Date.now() }));

export default Routes;