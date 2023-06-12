const pool = require("../config/db");

const Tweet = {
  getTweetsForAnonymous: async () => {
    const query = "SELECT * FROM tweets";
    const [rows, fields] = await pool.query(query);
    return rows;
  },

  create: async ({ username, content, picture, web_link, parent_id }) => {
    const query =
      "INSERT INTO tweets(username, content, picture, web_link, parent_id) VALUES(?, ?, ?, ?, ?);";
    const [result] = await pool.query(query, [
      username,
      content,
      picture,
      web_link,
      parent_id,
    ]);
    return result.insertId;
  },
};

module.exports = Tweet;
