require("dotenv").config();
const db = require("./config/db");

db.query("SELECT NOW()", (err, result) => {
    if (err) {
        console.error("❌ PostgreSQL connection failed:");
        console.error(err.message);
    } else {
        console.log("✅ PostgreSQL connected!");
        console.log("Database time:", result.rows[0].now);
    }

    db.end();
});