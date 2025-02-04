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
    const { rows } = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
