import dotenv from "dotenv";
import { Pool } from "pg";

// Load environment variables
dotenv.config();

// Database connection pool
const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT), // Convert to number
  database: process.env.PG_DATABASE,
});

// Test database connection
pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ Connection error:", err));

export default pool;
