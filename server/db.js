import sqlite3 from "sqlite3";

// Create a new database connection
const db = new sqlite3.Database("counters.db", (err) => {
  if (err) {
    console.error(err.message);
    return;
  }

  console.log("Connected to the database");

  // Create a counters table and initialize it with an initial counter value
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS counters (
        id INTEGER PRIMARY KEY,
        value INTEGER
      )
    `);

    db.run(`
      INSERT OR IGNORE INTO counters (id, value)
      VALUES (1, 0)
    `);
  });
});

export default db;
