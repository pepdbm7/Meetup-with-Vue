const express = require("express");
const jwt = require("jsonwebtoken");

//helpers:
// const User = require("../models/User");
const userLogic = require("../logic_routes/User");

//initialize router:
const router = express.Router();

router.post("/signup", (req, res) => {
  return userLogic
    .registerUser(req.body)
    .then(() =>
      res.json({ message: `${req.body.username} successfully signed up!` })
    )
    .catch(err => console.log(err));
});

router.post("/signin", (req, res) => {
  return userLogic
    .loginUser(req.body)
    .then(token =>
      res.json({
        message: `${req.body.username} successfully signed in!`,
        token
      })
    )
    .catch(err => console.log(err));
});

module.exports = router;
