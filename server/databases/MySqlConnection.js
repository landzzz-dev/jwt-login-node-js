import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

// const monitoring_system = knex({
//     client: 'mysql2',
//     connection: {
//         host: process.env.LOCALHOST_HOST,
//         port: process.env.LOCALHOST_PORT as any,
//         user: process.env.LOCALHOST_USER,
//         password: process.env.LOCALHOST_PASSWORD,
//         database: 'monitoring_system',
//     },
//     pool: { min: 2, max: 10 },
//     acquireConnectionTimeout: 10000,
// });


const JwtTestDB = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT) || 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: 'jwt_test_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: 'utf8mb4',
    connectTimeout: 10000,
    multipleStatements: false, // Prevent SQL injection via multiple queries (default is false)
    ssl: process.env.MYSQL_SSL === 'true' ? { rejectUnauthorized: true } : undefined // Use SSL if applicable
});


export { JwtTestDB }