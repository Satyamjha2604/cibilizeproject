// db.js
import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL);

export const createTables = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS expenses (
      id SERIAL PRIMARY KEY,
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      description TEXT NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      category TEXT NOT NULL,
      date DATE NOT NULL
    );
  `;
  console.log("✅ Tables checked/created successfully");
};

export default sql;
