//models:

const Comment = require("../models/Comment");

const commentLogic = {
  //create a new comment:
  async createComment(userId, meetupId, comment) {
    const newComment = { user: userId, meetup: meetupId, content: comment };
    await Comment.create(newComment);
  },

  //get all comments of this meetup:
  async getCommentsofMeetup(meetupId) {
    const comments = await Comment.find({ meetup: meetupId }, { __v: 0 })
      .populate("user", { password: 0, __v: 0 })
      .lean();

    if (!comments) throw new Error(`This meetup doesn't have comments yet`);

    return comments;
  }
};

module.exports = commentLogic;
