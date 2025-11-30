const { mysqlPool } = require('../config/database');

class User {
    static async create(userData) {
        const { username, email, password } = userData;
        const [result] = await mysqlPool.execute(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, password]
        );
        return result;
    }

    static async findByEmail(email) {
        const [rows] = await mysqlPool.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        return rows[0];
    }

    static async findById(id) {
        const [rows] = await mysqlPool.execute(
            'SELECT id, username, email, created_at FROM users WHERE id = ?',
            [id]
        );
        return rows[0];
    }
}

module.exports = User;