const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const sha1 = require("sha1");

// const pool = mysql.createPool(config.db);

// login
router.post("/", async (req, res) => {
  res.send("login");
});

// validate user
router.get("/user", authenticateToken, (req, res) => {
  res.send("validate user");
});

function authenticateToken(req, res, next) {
  // TODO
  // verify req.headers["authorization"];
  // validate & return user
  // return user

  next();
}

// maybe refreshing tocken
router.post("/refreshToken", (req, res) => {
  res.send("refreshing tocken");
});

module.exports = router;
