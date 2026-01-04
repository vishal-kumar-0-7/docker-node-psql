const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432
});

// Test route
app.get("/", (req, res) => {
  res.send("Dockerized Node + PostgreSQL API ");
});

// Get users
app.get("/users", async (req, res) => {
  const result = await pool.query("SELECT * FROM userss");
  res.json(result.rows);
});

// Add user
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  await pool.query(
    "INSERT INTO userss (name, email) VALUES ($1, $2)",
    [name, email]
  );
  res.send("User added");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
