import * as winston from 'winston';
import { requestId } from './generateRequestId';

const { createLogger, format, transports } = winston;
const { combine, timestamp, printf, json } = format;

const customFormat = printf((info) => {
	const message = {
		uuid: requestId(),
		message: info.message,
		level: info.level,
		timestamp: info.timestamp,
	};

	return `[${info.level.toUpperCase()}]: ${JSON.stringify(message)}`;
});

const logger = createLogger({
	format: combine(json(), timestamp(), customFormat),
	transports: [new transports.Console()],
});

export default logger;
