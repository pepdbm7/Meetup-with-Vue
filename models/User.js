const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  joinDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = model("User", UserSchema);
