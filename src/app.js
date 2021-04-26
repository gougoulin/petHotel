require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const winston = require("winston");
const expressWinston = require("express-winston");

// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
// var apiRouter = require("./routes/api");
// var apiRouter = require("./routes/v1/api");

// define routers
var authRouter = require("./routes/v2/auth");
var adminRouter = require("./routes/v2/admin");
var customerRouter = require("./routes/v2/customer");
var employeeRouter = require("./routes/v2/employee");
var petRouter = require("./routes/v2/pet");
var userRouter = require("./routes/v2/user");
var paymentRouter = require("./routes/v2/payment");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) {
      return false;
    }, // optional: allows to skip some log messages based on request and/or response
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/** disable the default routes */
// app.use("/", indexRouter);
// app.use("/users", usersRouter);
/** API Route */
// v1 endpoints
// app.use("/api/v1/", apiRouter);
// v2 endpoints
app.use("/api/v2/auth", authRouter);
// app.use("/api/v2/users", userRouter);
// app.use("/api/v2/customers", customerRouter);
// app.use("/api/v2/pets", petRouter);
// app.use("/api/v2/employees", employeeRouter);
// app.use("/api/v2/payments", paymentRouter);
// app.use("/api/v2/admins", adminRouter);

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
