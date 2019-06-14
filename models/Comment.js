const {
  Schema,
  model,
  SchemaTypes: { ObjectId }
} = require("mongoose");

const CommentSchema = new Schema({
  user: {
    type: ObjectId,
    ref: "User",
    required: true
  },
  meetup: {
    type: ObjectId,
    ref: "Meetup",
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

module.exports = model("Comment", CommentSchema);
