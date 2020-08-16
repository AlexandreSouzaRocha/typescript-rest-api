import { Sequelize } from 'sequelize-typescript';
import { DB_HOST, DB_NAME, DB_USER } from './config';

class Connection {
	static instance: Connection;

	constructor() {}

	getConnection(password: string) {
		return new Sequelize({
			host: DB_HOST,
			database: DB_NAME,
			username: DB_USER,
			password,
			dialect: 'postgres',
			models: [`${__dirname}/models`],
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
