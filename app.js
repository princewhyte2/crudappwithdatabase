var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var dataRouter = require("./routes/dataRouter");
//const MongoClient = require("mongodb").MongoClient;

const mongoose = require("mongoose");
const Data = require("./models/data");

const url =
  "mongodb+srv://Princewhyte2:5rBgygL0TSScDRsO@cluster0.8jxlg.mongodb.net/data?retryWrites=true&w=majority";

// const client = new MongoClient(url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// client.connect((err) => {
//   const collection = client.db("data").collection("data");
//   console.log("Connected correctly to the server");
//   // perform actions on the collection object
//   client.close();
// });
connect.then(
  (db) => {
    console.log("Connected correctly to the server");
  },
  (err) => {
    console.log(err);
  }
);

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/data", dataRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
