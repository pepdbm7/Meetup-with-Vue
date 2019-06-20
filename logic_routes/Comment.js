//models:

const Comment = require("../models/Comment");

const commentLogic = {
  async createComment(userId, meetupId, comment) {
    const newComment = { user: userId, meetup: meetupId, content: comment };
    const created = await new Comment(newComment);
    console.log("the new id of the comment is:", _id);
  },

  async getCommentsofMeetup(meetupId) {
    const comments = await Comment.find({ meetup: meetupId }, { __v: 0 })
      .populate("user", { password: 0, __v: 0 })
      .lean();

    if (!comments) throw new Error(`This meetup doesn't have comments yet`);

    return comments;
  }
};

module.exports = commentLogic;
