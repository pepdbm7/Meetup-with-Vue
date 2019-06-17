const bcrypt = require("bcrypt");

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
    //encrypt password:
    const encryptPassword = await bcrypt.hash(password, 10);

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

    if (user && bcrypt.compareSync(password, user.password)) {
      const payload = {
        _id: user.id,
        username
      };

      let token = await jwt.sign(payload, secret, {
        expiresIn: 86400 // expires in 24 hours
      });

      if (!token) throw new Error("Couldn't get the user token");

      return await {
        id: payload._id,
        token
      };
    } else {
      throw new Error("Wrong credentials, try again");
    }
  }
};

module.exports = logicUser;
