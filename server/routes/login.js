const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { profileController } = require("../controllers/profileController");

const router = express.Router();
const {loginUser} = require("../controllers/loginController")
router.post("/login", loginUser);
router.get("/profile", authMiddleware, profileController);
module.exports = router;