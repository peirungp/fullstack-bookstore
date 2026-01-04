import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const PASSWORD = process.env.DB_PASSWORD;

const pool = mysql.createPool({
    host: process.env.MYSQLHOST || 'localhost',
    user: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASSWORD || PASSWORD,
    database: process.env.MYSQLDATABASE || 'bookspace',
    port: process.env.MYSQLPORT || 3307,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export default pool;