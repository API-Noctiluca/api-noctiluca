import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const db_connection = new Sequelize(process.env.DB_NAME, process.env.USER_DB, process.env.PASSWORD_DB, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    define: {
        timestamps: true,
        underscored: true
    }
});

export default db_connection;