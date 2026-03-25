const fs = require("fs");
const mysql = require("mysql2");

console.log("🚀 Script started...");

// Read JSON
const data = JSON.parse(fs.readFileSync("trains.json", "utf-8"));

console.log("📦 Total trains:", data.features.length);

// DB connection

const db = mysql.createConnection({
    host: "crossover.proxy.rlwy.net",
    user: "root",
    password: "OvvWOGVntEdxeYWJKoWmpPvuPlkKabUt",
    database: "railway",
    port: 50072
});

db.connect(err => {
    if (err) {
        console.log("❌ DB ERROR:", err);
        return;
    }
    console.log("✅ Connected to MySQL");
});

let count = 0;

data.features.forEach(item => {
    const p = item.properties;

    db.query(
        `INSERT INTO trains 
        (train_number, train_name, source, destination, departure, arrival)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            p.number,
            p.name,
            p.from_station_code,
            p.to_station_code,
            p.departure === "None" ? null : p.departure,
p.arrival === "None" ? null : p.arrival
        ],
        (err) => {
            if (err) console.log("❌ Insert error:", err);
            else count++;
        }
    );
});

setTimeout(() => {
    console.log(`🔥 Inserted ${count} rows`);
    db.end();
}, 5000);