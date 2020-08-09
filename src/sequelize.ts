import { Sequelize } from 'sequelize';
import { DB_HOST, DB_NAME, DB_USER } from './config';
import { dbpassword } from './utils/credentialsMiddleware';

class Connection {
	static instance: Connection;

	constructor() {}

	async getConnection(password: string) {
		return new Sequelize({
			host: DB_HOST,
			database: DB_NAME,
			username: DB_USER,
			password,
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
}

export default Connection;
