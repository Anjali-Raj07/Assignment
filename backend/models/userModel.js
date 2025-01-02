const db = require("../config/db");

class User {
  static createUser(email, hashedPassword, callback) {
    const query = "INSERT INTO users (email, password) VALUES (?, ?)";
    db.query(query, [email, hashedPassword], callback);
  }

  static findUserByEmail(email, callback) {
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], callback);
  }
}

module.exports = User;
