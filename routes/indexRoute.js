const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
const { database } = require("../models/userModel");

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

// student-added admin index route
router.get("/admin", isAdmin, (req, res) => {
  res.render("admin", {
    user: req.user,
    sessionStore: req.sessionStore
  });
});

module.exports = router;
