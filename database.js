const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // Use ':memory:' for an in-memory database or 'database.sqlite' for a file-based database

db.serialize(() => {
  // Create a sample table
  db.run('CREATE TABLE user (id INT, name TEXT)');

  // Insert some sample data
  const stmt = db.prepare('INSERT INTO user VALUES (?, ?)');
  stmt.run(1, 'Alice');
  stmt.run(2, 'Bob');
  stmt.finalize();

  // Query the data
  db.each('SELECT id, name FROM user', (err, row) => {
    console.log(`User id: ${row.id}, name: ${row.name}`);
  });
});

function insertUser(name, callback) {
    const stmt = db.prepare('INSERT INTO user (name) VALUES (?)');
    stmt.run(name, function (err) {
      callback(err, this.lastID);
    });
    stmt.finalize();
  }

module.exports = {
  db,
  insertUser
};
