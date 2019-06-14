require("dotenv");
const express = require("express");
const app = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");
app.use(cors());

process.env.SECRET_KEY = "secret";
