const { connection } = require('../../db-connection');

class Playlist {
  static findMany(filters) {
    let sql = "SELECT * FROM playlists";
    let sqlValues = [];
    if (filters.title) {
      sql += ' WHERE title LIKE ?'
      sqlValues.push(`%${filters.title}%`);
    }
    if (filters.genre) {
      sql += ' WHERE genre = ?'
      sqlValues.push(`${filters.genre}`);
    }
    return connection.promise().query(sql, sqlValues);
  }

  static findOneById(id) {
    const sql = "SELECT * FROM playlists WHERE id = ?";
    return connection.promise().query(sql, [id]);
  }

  static createOne(playlist) {
    const sql = "INSERT INTO playlists SET ?";
    return connection.promise().query(sql, [playlist]);
  }

  static updateOne(id, newPlaylist) {
    const sql = "UPDATE playlists SET ? WHERE id = ?";
    return connection.promise().query(sql, [newPlaylist, id]);
  }

  static deleteOne(id) {
    const sql = "DELETE FROM playlists WHERE id = ?";
    return connection.promise().query(sql, [id]);
  }

} 

module.exports = Playlist;