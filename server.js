require("dotenv").config();
let express = require("express");
let session = require("express-session");

const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser")
// const flash = require('express-flash')
const passport = require("./config/index");
const bodyParser = require("body-parser");

const apiRoutes = require("./routes/apiRoutes");
const petRoutes = require("./routes/petApi");
const adminRoutes = require("./routes/adminRoutes");
const awsRoutes = require("./routes/awsRoutes");
const postRoutes = require("./routes/postRoutes");

const PORT = process.env.PORT || 3008;

const app = express();

// app.use(flash());   

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

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, //required
    saveUninitialized: false, //required
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(apiRoutes);
app.use(petRoutes);
app.use(adminRoutes);
app.use(awsRoutes);
app.use(postRoutes);

// Define all API routes before this runs
// Send every request to the React app
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/index.html"));
});

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
  }
);

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
