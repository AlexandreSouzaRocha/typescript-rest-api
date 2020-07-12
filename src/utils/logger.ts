import * as winston from "winston";

const uuid = require("./globals").uuid;
const { createLogger, format, transports } = winston;
const { combine, timestamp, printf, json } = format;

const customFormat = printf(info => {
    let message = {
        uuid: uuid,
        message: info.message,
        level: info.level,
        timestamp: info.timestamp
    }

    return `[${info.level.toUpperCase()}]: ${JSON.stringify(message)}`;
});
export const logger = createLogger({
    format: combine(
        json(),
        timestamp(),
        customFormat
    ),
    transports: [new transports.Console()]
});

