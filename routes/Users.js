const express = require("express");
const app = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");
app.use(cors());

const secret = process.env.SECRET_KEY;

app.post(
  "/register",
  async ({ username, email, password, city, avatar, joinDate }, res) => {
    const today = new Date();
    const userData = {
      username,
      email,
      password,
      city,
      avatar,
      joinDate
    };
  }
);
