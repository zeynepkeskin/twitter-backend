const bcrypt = require("bcrypt");
const pool = require("../config/db");

const User = {
  jwtSecretKey: "8dshbf78h4978fhysgefu47",

  findByUsername: async (username) => {
    const query = "SELECT * FROM users WHERE username = ?";
    const [rows, fields] = await pool.query(query, [username]);
    return rows[0];
  },

  create: async ({ email, username, password }) => {
    if (!email || !username || !password)
      throw new Error("Email, username and pasword are required");

    const hashedPassword = await bcrypt.hash(password, 10);
    const query =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    const [result] = await pool.query(query, [username, email, hashedPassword]);
    return username;
  },

  comparePasswords: async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  },

  getUsers: async ({ username, page, type }) => {
    // type: 'followers' or 'following'
    if (!page) page = "0";
    if (type != "followers" && type != "following")
      throw new Error("Invalid type");

    const query =
      type == "followers"
        ? "SELECT * FROM users WHERE username in (SELECT follower_username FROM followers WHERE following_username = ?) LIMIT 20 OFFSET ?"
        : "SELECT * FROM users WHERE username in (SELECT following_username FROM followers WHERE follower_username = ?) LIMIT 20 OFFSET ?";
    const [rows, fields] = await pool.query(query, [
      username,
      parseInt(page) * 20,
    ]);
    return rows;
  },
};

module.exports = User;
