const express = require("express");

//helpers:
// const User = require("../models/User");
const meetupLogic = require("../logic_routes/Meetup");

//initialize router:
const router = express.Router();

router.post("/meetup/new", (req, res) => {
  console.log(req.body);
  return meetupLogic
    .createMeetup(req.body)
    .then(() => res.json({ message: `Meetup successfully created!` }))
    .catch(err => {
      const { message } = err;
      res.json({
        error: message
      });
    });
});

// router.post("/signin", (req, res) => {
//   return meetupLogic
//     .loginUser(req.body)
//     .then(user => ({
//       message: `${req.body.username} successfully signed in!`,
//       data: {
//         id: user.id,
//         token: user.token
//       }
//     }))
//     .then(response => res.json(response))
//     .catch(err => {
//       const { message } = err;
//       res.json({
//         error: message
//       });
//     });
// });

module.exports = router;
