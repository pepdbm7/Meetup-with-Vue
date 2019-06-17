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
    .catch(err => {
      const { message } = err;
      res.json({
        error: message
      });
    });
});

router.post("/signin", (req, res) => {
  return userLogic
    .loginUser(req.body)
    .then(user => ({
      message: `${req.body.username} successfully signed in!`,
      data: {
        id: user.id,
        token: user.token
      }
    }))
    .then(response => res.json(response))
    .catch(err => {
      const { message } = err;
      res.json({
        error: message
      });
    });
});

module.exports = router;
