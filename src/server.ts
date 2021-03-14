import app from './app';
import { PORT } from './config';
import logger from './utils/logger';

(async () => {
	app.listen(PORT, () => {
		logger.info({ event: '[SERVER]', message: `Connected on PORT [${PORT}]` });
	});
})();
