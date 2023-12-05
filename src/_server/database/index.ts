import sqlite3 from "sqlite3";
import bcrypt from "bcrypt";

// Create a new database connection
const db = new sqlite3.Database("models.db", async (err) => {
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

    // Create a users table
    db.run(
      `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        createdTs TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedTs TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        hashedPassword TEXT NOT NULL
      )
    `,
      async (err) => {
        if (err) {
          console.error(err.message);
          return;
        }

        // Hash the initial user's password
        const hashedPassword = await bcrypt.hash("secret123", 10);

        // Insert the initial user
        db.run(
          `
        INSERT OR IGNORE INTO users (email, firstName, lastName, hashedPassword)
        VALUES (?, ?, ?, ?)
      `,
          ["test@gmail.com", "test", "test", hashedPassword],
          (err) => {
            if (err) {
              console.error("Error inserting initial user:", err.message);
            }
          }
        );
      }
    );
  });
});

export default db;
