const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const SECRET_KEY = process.env.JWT_SECRET;

// Register a new user
const signup = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    User.createUser(email, hashedPassword, (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ message: "Email is already registered." });
        }
        return res.status(500).json({ message: "Database error.", error: err });
      }
      res.status(201).json({ message: "User registered successfully." });
    });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err });
  }
});

// Login an existing user
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    User.findUserByEmail(email, async (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error.", error: err });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid email or password." });
      }

      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid email or password." });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

      res.status(200).json({ message: "Login successful.", token });
    });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err });
  }
});

module.exports = {
  signup,
  login,
};
