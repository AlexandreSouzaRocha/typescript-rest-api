import knex from 'knex';

import Commons from '../../utils/Commons';
import {
	DB_DEBUG,
	DB_HOST,
	DB_NAME,
	DB_USER,
	DB_POOL_MIN,
	DB_POOL_MAX,
	DB_PORT,
	DB_ACQUIRE_CONNECTION_TIMEOUT_MILLIS,
	DB_CREATE_TIMEOUT_MILLIS,
	DB_ACQUIRE_TIMEOUT_MILLIS,
} from '../../config';

class KnexConnection {
	commons: Commons;

	constructor() {
		this.commons = new Commons();
	}

	getInstance() {
		return knex({
			client: 'pg',
			debug: DB_DEBUG === 'on',
			connection: async () => {
				const dbPassword: any = await Commons.getPassword();
				return {
					host: DB_HOST,
					database: DB_NAME,
					password: dbPassword,
					port: DB_PORT,
					user: DB_USER,
				};
			},
			pool: {
				min: parseInt(DB_POOL_MIN, 10),
				max: parseInt(DB_POOL_MAX, 10),
				acquireTimeoutMillis: parseInt(DB_ACQUIRE_TIMEOUT_MILLIS, 10),
				createTimeoutMillis: parseInt(DB_CREATE_TIMEOUT_MILLIS, 10),
			},
			acquireConnectionTimeout: parseInt(DB_ACQUIRE_CONNECTION_TIMEOUT_MILLIS, 10),
		});
	}
}

export default new KnexConnection().getInstance();
