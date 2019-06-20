const express = require("express");

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
    .then(user => res.json(user))
    .catch(err => {
      const { message } = err;
      res.json({
        error: message
      });
    });
});

router.get("/user/:userId", (req, res) => {
  const {
    params: { userId }
  } = req;
  return userLogic
    .retrieveUserData(userId)
    .then(user => res.json(user))
    .catch(err => {
      const { message } = err;
      res.json({
        error: message
      });
    });
});

module.exports = router;
