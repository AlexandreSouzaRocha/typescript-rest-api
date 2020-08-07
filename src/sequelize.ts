import { Sequelize } from 'sequelize';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from './config';

export const sequelize: Sequelize = new Sequelize({
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
