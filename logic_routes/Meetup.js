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
  },

  async assistToMeetup(userId, meetupId) {
    const meetup = await Meetup.findById(meetupId);
    const isAlreadyAssisting = await meetup.assistants.find(
      usersid => usersid === userId
    );

    if (isAlreadyAssisting)
      throw new Error("You were already in the assistants list!");

    await meetup.assistants.push(userId);

    return await meetup.save();
  },

  async cancelAssistance(userId, meetupId) {
    const meetup = await Meetup.findById(meetupId);
    const listWithoutUserId = await meetup.assistants.filter(
      usersid => usersid !== userId
    );

    const userIdNotDeleted = await listWithoutUserId.find(
      usersId => usersId === userId
    );

    if (userIdNotDeleted)
      throw new Error("Couldn't remove user from assistants list");

    meetup.assistants = listWithoutUserId;

    return await meetup.save();
  }
};

module.exports = meetupLogic;
