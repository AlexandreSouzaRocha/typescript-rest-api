import app from './app';
import { PORT } from './config';
import logger from './utils/logger';
import Commons from './utils/Commons';

(async () => {
	app.listen(PORT, () => {
		logger.info({ event: '[SERVER]', message: `Connected on PORT [${PORT}]` });
	});
})();
