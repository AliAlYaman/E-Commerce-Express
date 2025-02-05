import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();  // 

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
});

(async () => {
  const client = await pool.connect();
  const dbName = await client.query("SELECT current_database();");
  console.log("🚀 Connected to Database:", dbName.rows[0].current_database);
  client.release();
})();

export default pool;
