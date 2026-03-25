const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());



// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "Ar@040804",
//     database: "railway"
// });

const db = mysql.createConnection({
    host: "crossover.proxy.rlwy.net",
    user: "root",
    password: "OvvWOGVntEdxeYWJKoWmpPvuPlkKabUt",
    database: "railway",
    port: 50072
});

db.connect(err => {
    if (err) {
        console.log("❌ DB connection failed:", err);
    } else {
        console.log("✅ Connected to MySQL");
    }
});

const path = require("path");

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/search", (req, res) => {
    let { from, to } = req.body;

    from = from.trim().toLowerCase();
    to = to.trim().toLowerCase();

    const query = `
        SELECT * FROM trains
        WHERE LOWER(source) LIKE ?
        AND LOWER(destination) LIKE ?
AND departure BETWEEN '05:00:00' AND '12:00:00'
ORDER BY departure ASC;
    `;

    db.query(query, [`%${from}%`, `%${to}%`], (err, results) => {
        if (err) {
            console.log("❌ Query error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        res.json(results);
    });
});

app.listen(50072, () => {
    console.log("🚀 Server running on http://localhost:3000");
});