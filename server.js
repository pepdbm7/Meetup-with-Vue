//data models:
const User = require("./models/User");
const Meetup = require("./models/Meetup");
const Comment = require("./models/Comment");

//packages:
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var bodyParser = require("body-parser");
const package = require("./package.json");
const router = require("./routes/Users");

//environment variables:
require("dotenv").config();
const {
  env: { PORT, MONGO_URL, SECRET_KEY }
} = process;

//initialize a server:
var app = express();

// Connecting to DB:
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("Success connected to database"));

//middleware:
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cors());

//routes:
app.use("/", router);

const port = PORT || 8080;

//listens connection on port:
app.listen(port, () =>
  console.log(
    `${package.name} ${package.version} up and running on port ${port}`
  )
);
