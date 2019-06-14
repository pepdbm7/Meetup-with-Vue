//data models:
const User = require("./models/User");
const Meetup = require("./models/Meetup");
const Comment = require("./models/Comment");

//packages:
const express = require("express");
var app = express();
const mongoose = require("mongoose");
const cors = require("cors");
var bodyParser = require("body-parser");
const package = require("./package.json");
const router = require("./routes");

//environment variables:
require("dotenv").config();
const { PORT, MONGO_URL, SECRET_KEY } = process.env;

// Connect with our DB on mlab:
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.log(`database server running at ${MONGO_URL}`);

    const port = PORT || 8080;

    app.use(bodyParser.json());
    app.use(cors());
    app.use(
      bodyParser.urlencoded({
        extended: false
      })
    );

    app.use("/routes", router);

    app.listen(port, () =>
      console.log(
        `${package.name} ${package.version} up and running on port ${port}`
      )
    );
  });
