const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("./middleware/passport/index");
const session = require("express-session");
const flash = require("connect-flash");
const app = express();

const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const booksListRouter = require("./routes/bookslist");
const createNewBookRouter = require("./routes/createNewBook");
const editBookRouter = require("./routes/editBook");
const pagingApiRouter = require("./routes/api/pagingApi");
const usersRouter = require("./routes/users");
const accountRouter=require("./routes/account");
const checkOutRouter = require("./routes/checkout");
const verifyRouter = require("./routes/verify");
const apiRouter = require("./routes/api");
require("./database/db");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));
app.use("/bookslist", express.static(path.join(__dirname, "public")));
app.use("/bookslist/search", express.static(path.join(__dirname, "public")));
app.use("/bookslist/createNew", express.static(path.join(__dirname, "public")));
app.use("/bookslist/edit/:id", express.static(path.join(__dirname, "public")));
app.use("/users/profile/:id", express.static(path.join(__dirname, "public")));
app.use("/account", express.static(path.join(__dirname, "public")));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/bookslist", booksListRouter);
app.use("/api/paging", pagingApiRouter);
app.use("/account",accountRouter);
app.use("/users", usersRouter);
app.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});
app.use("/verify", verifyRouter);
app.use("/api", apiRouter);
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

const port=3000;
app.listen(port, ()=>{});

module.exports = app;
