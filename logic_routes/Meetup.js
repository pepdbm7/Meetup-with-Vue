//models:
const Meetup = require("../models/Meetup");
const User = require("../models/User");

// require("dotenv").config();
// const secret = process.env.SECRET_KEY;
// const jwt = require("jsonwebtoken");

const meetupLogic = {
  async createMeetup({ userId, meetupData }) {
    console.log(meetupData);
    const user = await User.findById(userId);

    if (!user) throw new Error(`User not found!`);

    const meetup = { ...meetupData, user: user.id, assistants: [user.id] };
    console.log("meetup: ", meetup);

    await Meetup.create(meetup);
  }
};

module.exports = meetupLogic;
