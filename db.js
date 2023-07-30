import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

export const db = mysql.createConnection({
   host: process.env.HOST,
   port: process.env.PORT,
   user: process.env.USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DATABASE,
});
