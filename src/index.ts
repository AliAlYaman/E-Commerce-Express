import express from "express";
import pool from "./config/db"; // Import PostgreSQL connection

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Express with TypeScript & PostgreSQL!");
});

// Sample route to fetch users from the database
app.get("/users", async (req, res) => {
  try {
    console.log("Checking database connection...");
    const client = await pool.connect();
    console.log("✅ Connected to database");

    // Check current database name
    const dbNameResult = await client.query("SELECT current_database();");
    console.log("📌 Connected to Database:", dbNameResult.rows[0].current_database);

    // Check existing tables
    const tablesResult = await client.query(`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public';
    `);
    console.log("📌 Available Tables:", tablesResult.rows.map((row: { table_name: string }) => row.table_name));

    // Run the query
    const { rows } = await client.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
