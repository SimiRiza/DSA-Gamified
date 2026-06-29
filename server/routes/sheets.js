const express = require("express");

const router = express.Router();

const { getSheets } = require("../controllers/sheetController");

router.get("/", getSheets);

module.exports = router;