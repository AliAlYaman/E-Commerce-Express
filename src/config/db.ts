const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "express", // Make sure this is correct
  password: "postgres",
  port: 5432,
});

(async () => {
  const client = await pool.connect();
  const dbName = await client.query("SELECT current_database();");
  console.log("🚀 Connected to Database:", dbName.rows[0].current_database);
  client.release();
})();

export default pool;
