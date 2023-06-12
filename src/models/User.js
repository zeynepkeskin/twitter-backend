const bcrypt = require('bcrypt');
const pool = require('../config/db');

const User = {

    jwtSecretKey: "8dshbf78h4978fhysgefu47",

    findByUsername: async (username) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        const [rows, fields] = await pool.query(query, [username]);
        return rows[0];
    },

    create: async ({email, username, password}) => {
        if(!email || !username || !password)
            throw new Error("Email, username and pasword are required");

        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        const [result] = await pool.query(query, [username, email, hashedPassword]);
        return username;
    },

    comparePasswords: async (password, hashedPassword) => {
        return await bcrypt.compare(password, hashedPassword);
    },

};

module.exports = User;
