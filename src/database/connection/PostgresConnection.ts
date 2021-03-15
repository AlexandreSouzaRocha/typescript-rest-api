import { Pool, PoolClient } from 'pg';
import logger from '../../utils/logger';
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
		logger.info({ event: 'PostgresConenection.createConnection' });

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

	static async closeConnection(connection: PoolClient): Promise<void> {
		logger.info({ event: 'PostgresConnection.closeConnection' });
		try {
			await connection.release(true);
		} finally {
			logger.info({ event: 'PostgresConnection.closeConnection', message: 'CONNECTION CLOSED SUCCESSFULLY.' });
		}
	}
}

export default PostgresConnection;
