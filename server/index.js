require("dotenv").config();

const express = require("express");
const cors = require("cors");
const sheetRoutes = require("./routes/sheets");

const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/sheets", sheetRoutes);

app.get("/", (req, res) => {
    res.send("🚀 DSA Quest Backend Running");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

