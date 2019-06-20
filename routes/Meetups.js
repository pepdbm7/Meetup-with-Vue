const express = require("express");

//helpers:
// const User = require("../models/User");
const meetupLogic = require("../logic_routes/Meetup");

//initialize router:
const router = express.Router();
//add new meetup:
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

//retrieve all meetups:
router.get("/meetups", (req, res) => {
  return meetupLogic.allMeetups().then(meetups => {
    console.log("meetups", meetups);
    res.json(meetups);
  });
});

//assist to a meetup:
router.put("/user/:userId/meetup/:meetupId/assist", (req, res) => {
  const {
    params: { userId, meetupId }
  } = req;

  return meetupLogic
    .assistToMeetup(userId, meetupId)
    .then(meetup =>
      res.json({ message: "Added to Meetup's Assistants list", meetup })
    )
    .catch(err => {
      const { message } = err;
      res.json({
        error: message
      });
    });
});

//assist to a meetup:
router.put("/user/:userId/meetup/:meetupId/cancelassistance", (req, res) => {
  const {
    params: { userId, meetupId }
  } = req;

  return meetupLogic
    .cancelAssistance(userId, meetupId)
    .then(meetup =>
      res.json({ message: "Removed from Meetup's Assistants list", meetup })
    )
    .catch(err => {
      const { message } = err;
      res.json({
        error: message
      });
    });
});

module.exports = router;
