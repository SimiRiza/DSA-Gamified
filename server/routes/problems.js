const express = require("express");

const router = express.Router();

const { getProblems,countProblems } = require("../controllers/problemController");

router.get("/count", countProblems);
router.get("/:patternId", getProblems);

module.exports = router;