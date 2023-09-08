// Import mysql
const mysql = require('mysql2/promise'); // Use mysql2 with promises
require('dotenv').config();

// Create a function to establish a connection
const connectDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        console.log(`Connected to the ${process.env.DB_NAME} database.`);
        return connection;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
};

module.exports = connectDB;
