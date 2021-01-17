import * as dotenv from 'dotenv';

dotenv.config();

export const { DB_HOST = '127.0.0.1' } = process.env;
export const { DB_NAME = 'microservices' } = process.env;
export const { DB_PASSWORD = '$Z5a]m?6' } = process.env;
export const { DB_USER = 'fatec_user' } = process.env;
export const { DB_DEBUG = 'on' } = process.env;
export const { DB_POOL_MIN = '2' } = process.env;
export const { DB_POOL_MAX = '5' } = process.env;
export const { DB_PORT = '5432' } = process.env;
export const { DB_ACQUIRE_TIMEOUT_MILLIS = '1000' } = process.env;
export const { DB_CREATE_TIMEOUT_MILLIS = '1000' } = process.env;
export const { DB_ACQUIRE_CONNECTION_TIMEOUT_MILLIS = '3000' } = process.env;

export const { PORT = 3000 } = process.env;
