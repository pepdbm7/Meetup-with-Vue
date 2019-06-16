const express = require("express");
const jwt = require("jsonwebtoken");

//helpers:
// const User = require("../models/User");
const secret = process.env.SECRET_KEY;
const userLogic = require("../logic_routes/User");

//initialize router:
const router = express.Router();

router.post("/signup", (req, res) => {
  return userLogic
    .registerUser(req.body)
    .then(() =>
      res.json({ message: `${req.body.username} successfully registered` })
    )
    .catch(err => console.log(err));
});

module.exports = router;
