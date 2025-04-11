const express = require("express");
const authService = require("../services/authService");
const { requireAuth } = require("../middlewares/authMiddleware");

const router = express.Router();
router.post('/register',authService.Register)
router.post("/login", authService.Login);
router.post("/logout", requireAuth, authService.Logout);

module.exports = router;
