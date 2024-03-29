import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';

import * as credentialsMiddleware from './utils/credentialsMiddleware';
import * as generateRequestId from './utils/generateRequestId';
import Routes from './routes/routes';

class App {
	app: express.Application;

	constructor() {
		this.app = express();
		this.middleware();
		this.bodyParser();
		this.routes();
	}

	private routes(): void {
		this.app.use('/api/v1', Routes);
	}

	private middleware(): void {
		this.app.use(cors());
		this.app.use(generateRequestId.expressMiddleware());
		this.app.use(credentialsMiddleware.expressMiddleware());
	}

	private bodyParser(): void {
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use((request, response, next) => {
			bodyParser.json()(request, response, (err) => {
				if (err) {
					return response.status(400).send({ message: 'Invalid JSON syntax. Check your request.body' });
				}
				next();
			});
		});
	}
}
export default new App().app;
