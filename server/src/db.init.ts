
import * as sqlite3 from 'sqlite3';

const dbPath = './dev.db';

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

const createTables = () => {
  db.serialize(() => {
    // Users Table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE,
      password_hash TEXT,
      name TEXT
    )`);

    // Trips Table (Extended for v2.0)
    db.run(`CREATE TABLE IF NOT EXISTS trips (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      title TEXT,
      description TEXT,
      departure_city TEXT,
      destination_city TEXT,
      scope TEXT, -- 'DOMESTIC', 'NATIONAL', 'INTERNATIONAL'
      persona TEXT, -- 'SOLO', 'COUPLE', 'FAMILY', 'FRIENDS'
      start_date TEXT,
      end_date TEXT,
      budget INTEGER,
      cover_image TEXT,
      is_public BOOLEAN,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )`);

    // Persona Answers Table (NEW)
    db.run(`CREATE TABLE IF NOT EXISTS persona_answers (
      trip_id TEXT PRIMARY KEY,
      q1_answer TEXT,
      q2_answer TEXT,
      FOREIGN KEY(trip_id) REFERENCES trips(id)
    )`);

    // Stops Table (Extended)
    db.run(`CREATE TABLE IF NOT EXISTS stops (
      id TEXT PRIMARY KEY,
      trip_id TEXT,
      city TEXT,
      country TEXT,
      arrival_date TEXT,
      departure_date TEXT,
      order_index INTEGER,
      accom_tier TEXT, -- 'AFFORDABLE', 'LUXURY'
      FOREIGN KEY(trip_id) REFERENCES trips(id)
    )`);

    // Activities Table
    db.run(`CREATE TABLE IF NOT EXISTS activities (
      id TEXT PRIMARY KEY,
      stop_id TEXT,
      name TEXT,
      category TEXT,
      cost REAL,
      date TEXT,
      status TEXT,
      notes TEXT,
      FOREIGN KEY(stop_id) REFERENCES stops(id)
    )`);

    // Expenses Table
    db.run(`CREATE TABLE IF NOT EXISTS expenses (
      id TEXT PRIMARY KEY,
      trip_id TEXT,
      description TEXT,
      amount REAL,
      category TEXT,
      date TEXT,
      FOREIGN KEY(trip_id) REFERENCES trips(id)
    )`);

    console.log('All tables created/updated successfully.');
  });
};

createTables();
