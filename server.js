//packages:
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
var bodyParser = require("body-parser");
const package = require("./package.json");
const users = require("./routes/Users");
const meetups = require("./routes/Meetups");
const comments = require("./routes/Comments");

//environment variables:
require("dotenv").config();
const {
  env: { PORT, MONGO_URL, NODE_ENV }
} = process;

//initialize a server:
var app = express();

// Connecting to DB:
mongoose
  .connect(`${MONGO_URL}`, { useNewUrlParser: true })
  .then(() => console.log(`db server running at ${MONGO_URL}`));

//middleware:
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cors());

//routes:
app.use("/", users);
app.use("/", meetups);
app.use("/", comments);

//Serve up static assets (usually on Heroku):
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist"));
});

if (NODE_ENV === "production") {
  console.log("node environment is production");
  app.use(express.static("client/dist"));
}

const port = PORT || 8080;

//listens connection on port:
app.listen(port, () =>
  console.log(
    `${package.name} ${package.version} up and running on port ${port}`
  )
);
