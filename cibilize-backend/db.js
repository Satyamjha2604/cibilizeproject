// db.js
const mysql = require("mysql2/promise");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

let dbConnection;

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

async function initializeDatabase() {
  try {
    dbConnection = await mysql.createConnection(dbConfig);
    console.log("MySQL connected successfully! 🚀");

    await dbConnection.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id VARCHAR(36) PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        `);

    await dbConnection.execute(`
            CREATE TABLE IF NOT EXISTS expenses (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id VARCHAR(36) NOT NULL,
                description VARCHAR(255) NOT NULL,
                amount DECIMAL(10, 2) NOT NULL,
                category VARCHAR(255) NOT NULL,
                date DATE NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `);
    console.log("Database tables are ready. ✅");
  } catch (err) {
    console.error("Failed to connect to MySQL or create tables:", err);
    process.exit(1);
  }
}

// Export the connection and initialization function for use in routes
module.exports = {
  initializeDatabase,
  getConnection: () => dbConnection,
  uuidv4, // Export uuidv4 as well for consistency
};
