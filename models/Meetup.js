//Meetup pep

const {
  Schema,
  model,
  SchemaTypes: { ObjectId }
} = require("mongoose");

const MeetupSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  user: {
    type: ObjectId,
    ref: "User",
    required: true
  },
  image: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  assistants: {
    type: Array,
    required: true
  }
});

module.exports = model("Meetup", MeetupSchema);
