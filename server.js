let express = require("express");
let session = require("express-session");

const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const passport = require('passport');
const bodyParser = require("body-parser");

const apiRoutes = require("./routes/apiRoutes");

const PORT = process.env.PORT || 3001;

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// middleware session instantiation;
app.use(
  session({
    secret: "drax-the-dogstroyer", //pick a random string to make the hash that is generated secure
    resave: false, //required
    saveUninitialized: false, //required
  })
);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// middleware for bodyParser;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// express middleware;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("client"));

app.use(cors());

app.use(apiRoutes);

// Define all API routes before this runs
// Send every request to the React app
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/index.html"));
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/chipperdb");

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
