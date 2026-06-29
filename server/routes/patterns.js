const express = require("express");

const router = express.Router();

const { getPatterns } = require("../controllers/patternController");

router.get("/:sheetId", getPatterns);

module.exports = router;