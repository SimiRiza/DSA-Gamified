const express = require("express");

const router = express.Router();

const { getSheets, countSheets } = require("../controllers/sheetController");
const { } = require("../controllers/sheetController");

router.get("/", getSheets);
router.get("/count", countSheets);

module.exports = router;