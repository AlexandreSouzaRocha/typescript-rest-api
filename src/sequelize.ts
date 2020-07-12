import { Sequelize } from "sequelize";
import {
    DB_HOST,
    DB_NAME,
    DB_PORT,
    DB_PASSWORD,
    DB_USER
} from "./config";

export const sequelize = new Sequelize({
    port: DB_PORT,
    host: DB_HOST,
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,
    dialect: "postgres",
    logging: false,
    sync:{
        force: false
    },
    define: {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    }
});