const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = {
  register: async (req, res, next) => {
    try {
      const { username, email, password } = req.body;

      // Check if the username already exists
      const existingUser = await User.findByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      // Create a new user
      await User.create({ email, username, password });

      res
        .status(201)
        .json({ message: "User registered successfully", username });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      // Find the user by username
      const user = await User.findByUsername(username);
      if (!user) {
        return res.status(401).json({ error: "Authentication failed" });
      }

      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Authentication failed" });
      }

      // Generate and sign a JWT token
      const token = jwt.sign({ username: user.username }, User.jwtSecretKey);

      res.json({ message: "Authentication successful", token });
    } catch (error) {
      next(error);
    }
  },

  getProfile: (req, res) => {
    res.json({ user: req.user });
  },

  getUsers: async (req, res, next) => {
    try {
      const tweetId = await User.getUsers({
        ...req.body,
        username: req.user.username,
      });

      res.status(201).json({ message: "Tweet created successfully", tweetId });
    } catch (error) {
      next(error);
    }
  },
};
