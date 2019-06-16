const bcrypt = require("bcrypt");

//models:
const User = require("../models/User");

const logicUser = {
  async registerUser({ username, email, password, city, avatar }) {
    //check if email or username already exist:
    const usedEmail = await User.findOne({ email });
    if (usedEmail) throw new Error("This email is already used!");
    const isUsedUsername = await User.findOne({ username });
    if (isUsedUsername) throw new Error("This username is already used");

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
  }
};

module.exports = logicUser;
