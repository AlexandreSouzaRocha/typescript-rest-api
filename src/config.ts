import * as dotenv from 'dotenv';

dotenv.config();

export const { DB_HOST = '127.0.0.1' } = process.env;
export const { DB_NAME = 'microservices' } = process.env;
export const { DB_PASSWORD } = process.env;
export const { DB_USER = 'gcm_user' } = process.env;
export const { PORT = 3000 } = process.env;
