import dotenv from "dotenv";
dotenv.config();

export const DB_NAME = process.env.DB_NAME;
export const USER_DB = process.env.USER_DB;
export const HOST = process.env.HOST || '127.0.0.1';
export const DB_DIALECT = process.env.DB_DIALECT;
export const PASSWORD_DB = process.env.PASSWORD_DB;
export const PORT = process.env.PORT || 3000;

