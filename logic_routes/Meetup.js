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
  },

  async allMeetups() {
    const meetups = await Meetup.find({}, { __v: 0 }).lean(); //deleting __v: 0 property set by mongo by default
    await meetups.forEach(meetup => {
      meetup.id = meetup._id.toString();
      delete meetup._id;
    });
    return await meetups;
  }
};

module.exports = meetupLogic;
