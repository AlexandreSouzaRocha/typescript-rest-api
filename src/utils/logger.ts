import * as winston from 'winston';

const { uuid } = require('./globals');

const { createLogger, format, transports } = winston;
const { combine, timestamp, printf, json } = format;

const customFormat = printf((info) => {
	const message = {
		uuid,
		message: info.message,
		level: info.level,
		timestamp: info.timestamp,
	};

	return `[${info.level.toUpperCase()}]: ${JSON.stringify(message)}`;
});
export const logger = createLogger({
	format: combine(json(), timestamp(), customFormat),
	transports: [new transports.Console()],
});
