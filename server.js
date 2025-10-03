
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const seed = require('./seed.js');
const app = express();
const port = 3000;

// Serve static files from the root directory
app.use(express.static(__dirname));

// Create a new database instance
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

// Read and execute the SQL file
fs.readFile('database.sql', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    db.exec(data, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Database schema created.');
        // Run the seeder
        seed(db);
    });
});

// API endpoint to get all products
app.get('/api/products', (req, res) => {
    db.all('SELECT * FROM products', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
