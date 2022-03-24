const { connection } = require('../../db-connection');

class Track {
  static findMany() {
    const sql = "SELECT * FROM tracks";
    return connection.promise().query(sql);
  }

  static findOneById(id) {
    const sql = "SELECT * FROM tracks WHERE id = ?";
    return connection.promise().query(sql, [id]);
  }

  static createOne(track) {
    const sql = "INSERT INTO tracks SET ?";
    return connection.promise().query(sql, [track]);
  }

  static updateOne(id, newTrack) {
    const sql = "UPDATE tracks SET ? WHERE id = ?";
    return connection.promise().query(sql, [newTrack, id]);
  }

  static deleteOne(id) {
    const sql = "DELETE FROM tracks WHERE id = ?";
    return connection.promise().query(sql, [id]);
  }
} 

module.exports = Track;