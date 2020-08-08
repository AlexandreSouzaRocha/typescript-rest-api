import { Sequelize } from 'sequelize';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from './config';
import logger from './utils/logger';
import Commons from './utils/Commons';

class Connection {
	static instance: Connection;

	password: any;

	constructor() {
		this.password = this.getPassword();
	}

	getConnection() {
		return new Sequelize({
			host: DB_HOST,
			database: DB_NAME,
			username: DB_USER,
			password: DB_PASSWORD,
			dialect: 'postgres',
			logging: false,
			sync: {
				force: false,
			},
			timezone: 'America/Sao_Paulo',
			define: {
				freezeTableName: true,
				createdAt: false,
				updatedAt: false,
			},
		});
	}

	static getInstance() {
		if (!Connection.instance) {
			Connection.instance = new Connection();
		}

		return Connection.instance;
	}

	getPassword() {
		logger.info({ event: 'Connection.getPaassword' });

		return new Promise((resolve) => {
			resolve(Commons.getPassword());
		});
	}
}

export default Connection;
