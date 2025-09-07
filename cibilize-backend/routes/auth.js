// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getConnection, uuidv4 } = require("../db");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    const dbConnection = getConnection();
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    await dbConnection.execute(
      "INSERT INTO users (id, username, password) VALUES (?, ?, ?)",
      [userId, username, hashedPassword]
    );
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Username already exists." });
    }
    res
      .status(500)
      .json({ message: "Error registering user.", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const dbConnection = getConnection();
    const [rows] = await dbConnection.execute(
      "SELECT id, password FROM users WHERE username = ?",
      [username]
    );
    const user = rows[0];

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    const token = jwt.sign({ id: user.id, username: username }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Login successful!", token });
  } catch (err) {
    res.status(500).json({ message: "Error logging in.", error: err.message });
  }
});

module.exports = router;
