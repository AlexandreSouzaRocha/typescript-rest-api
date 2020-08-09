import { Sequelize } from 'sequelize';

import app from './app';
import { PORT } from './config';
import Connection from './sequelize';
import logger from './utils/logger';
import Commons from './utils/Commons';

(async () => {
	try {
		const password: any = await Commons.getPassword();
		const connection: Sequelize = await Connection.getInstance().getConnection(String(password));
		await connection.sync();

		logger.info({ event: '[DATABASE]', message: 'Connected on Postgres' });
	} catch (err) {
		logger.error({ event: '[DATABASE_ERROR]', error: err.message });
	}

	app.listen(PORT, () => {
		logger.info({ event: '[SERVER]', message: `Connected on PORT [${PORT}]` });
	});
})();
