import app from './app';
import { PORT } from './config';
import Connection from './sequelize';
import logger from './utils/logger';

(async () => {
	try {
		const connection: Connection = Connection.getInstance();
		await connection.getConnection().sync();

		logger.info({ event: '[DATABASE]', message: 'Connected on Postgres' });
	} catch (err) {
		logger.error({ event: '[DATABASE_ERROR]', error: err.message });
	}

	app.listen(() => {
		logger.info({ event: '[SERVER]', message: `Connected on PORT [${PORT}]` });
	});
})();
