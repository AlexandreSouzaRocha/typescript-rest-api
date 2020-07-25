import app from './app';
import { PORT } from './config';
import sequelize from './sequelize';
import { logger } from './utils/logger';

(async () => {
	try {
		await sequelize.sync();

		logger.info({ event: '[DATABASE]', message: 'Connected on Postgres' });
	} catch (err) {
		logger.error({ event: '[DATABASE_ERROR]', error: err.message });
	}

	app.listen(() => {
		logger.info({ event: '[SERVER]', message: `Connected on PORT [${PORT}]` });
	});
})();
