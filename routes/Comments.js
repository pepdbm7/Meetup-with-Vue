const express = require("express");

//helpers:
// const User = require("../models/User");
const commentLogic = require("../logic_routes/Comment");

//initialize router:
const router = express.Router();

//add new comment:
router.post("/meetup/:meetupId/newcomment", (req, res) => {
  const {
    params: { meetupId },
    body: { userId, comment }
  } = req;

  return commentLogic
    .createComment(userId, meetupId, comment)
    .then(() => res.json({ message: `Comment successfully created!` }))
    .catch(err => {
      const { message } = err;
      res.json({
        error: message
      });
    });
});

//retrieve all comments of the meetup:
router.get("/comments/:meetupId", (req, res) => {
  const {
    params: { meetupId }
  } = req;

  return commentLogic.getCommentsofMeetup(meetupId).then(comments => {
    res.json(comments);
  });
});

module.exports = router;
