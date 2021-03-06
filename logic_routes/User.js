//models:
const User = require("../models/User");

require("dotenv").config();
const secret = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");

const logicUser = {
  async registerUser({ username, email, password, city, avatar }) {
    //check if email or username already exist:
    const usedEmail = await User.findOne({ email });

    if (usedEmail) throw new Error(`The email ${email} is already used!`);

    const isUsedUsername = await User.findOne({ username });

    if (isUsedUsername)
      throw new Error(`The username ${username} is already used`);

    const joinDate = new Date();

    let newUser = {
      username,
      email,
      password: encryptPassword,
      city,
      avatar,
      joinDate
    };

    await User.create(newUser);
  },
  async loginUser({ username, password }) {
    const user = await User.findOne({ username });

    if (!user) throw new Error(`User not found!!`);

    const payload = await {
      _id: user._id.toString(),
      username
    };

    let token = await jwt.sign(payload, secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    if (!token) throw new Error("Couldn't get the user token");

    const response = {
      id: payload._id,
      token,
      username,
      avatar: user.avatar
    };

    return await response;
  },

  async retrieveUserData(userId) {
    const user = await User.findById(userId, {
      _id: 0,
      password: 0,
      image: 0,
      __v: 0
    }).lean();

    if (!user) throw new NotFoundError(`user with id ${userId} not found`);

    return user;
  }
};

module.exports = logicUser;
