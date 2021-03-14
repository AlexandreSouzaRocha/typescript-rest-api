import { Pool, PoolClient } from 'pg';

import Commons from '../../utils/Commons';
import {
	DB_HOST,
	DB_NAME,
	DB_USER,
	DB_POOL_MIN,
	DB_POOL_MAX,
	DB_PORT,
	DB_ACQUIRE_CONNECTION_TIMEOUT_MILLIS,
	DB_ACQUIRE_TIMEOUT_MILLIS,
} from '../../config';

class PostgresConnection {
	commons: Commons;

	constructor() {
		this.commons = new Commons();
	}

	static async createConnection(): Promise<PoolClient> {
		const pool: Pool = new Pool({
			user: DB_USER,
			database: DB_NAME,
			port: parseInt(DB_PORT, 10),
			host: DB_HOST,
			password: await Commons.getPassword(),
			min: parseInt(DB_POOL_MIN, 10),
			max: parseInt(DB_POOL_MAX, 10),
			connectionTimeoutMillis: parseInt(DB_ACQUIRE_CONNECTION_TIMEOUT_MILLIS, 10),
			idleTimeoutMillis: parseInt(DB_ACQUIRE_TIMEOUT_MILLIS, 10),
		});

		return pool.connect();
	}
}

export default PostgresConnection;
