const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const createError = require("http-errors");

require("dotenv").config();
require("./config/database");
require("./config/passport");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const matchesRouter = require("./routes/matches");
const swipeRoutes = require("./routes/swiping");
const ownersRouter = require("./routes/owners");
const userRoutes = require("./routes/userRoutes");
const dogsRouter = require("./routes/dogs");
const authRoutes = require("./routes/authRoutes");
const indexRouter = require("./routes/index");

const app = express();
require("./config/passport")(app);
const PORT = process.env.PORT || 3000;

console.log("DATABASE_URL:", process.env.DATABASE_URL);
// Database connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/uploads", express.static("uploads"));
app.use(methodOverride("_method"));

// Session setup
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Custom middleware to set user in res.locals
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

// More middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session setup with additional options
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using https
  })
);

// Passport initialization (again)
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", matchesRouter);
app.use("/", swipeRoutes);
app.use("/owners", ownersRouter);
app.use("/user", userRoutes);
app.use("/", dogsRouter);
app.use(logger("dev"));
app.use("/", authRoutes);
app.use("/", indexRouter);
// Error handling
app.use(function (req, res, next) {
  next(createError(404));
});


app.use(function (err, req, res, next) {
  if (req.app.get("env") === "development") {
    console.error(err.stack);
  }

  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error", { title: "Error Page" });
});

// Logging routes
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(`Route: ${middleware.route.path}`);
  }
});

// Database connection status
db.on("error", function (error) {
  console.log("MongoDB connection error:", error);
  // res.status(500).send("Database connection error. Please try again later.");
});

db.once("open", function () {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});

module.exports = app;