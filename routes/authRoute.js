const express = require("express");
const authService = require("../services/authService");

const router = express.Router();
router.post('/register',authService.Register)
router.post("/login", authService.Login);
router.post('/logout',authService.Logout)

module.exports = router;
