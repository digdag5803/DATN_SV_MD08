const express = require("express");
const morgan = require("morgan");
const path = require("path");
const router = require("./routers/index");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const methodOverride = require("method-override");
require("dotenv").config();

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "resources/views"));

// session middleware
app.use(
  session({
    secret: "AUTH",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(morgan("dev"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(methodOverride("_method"));
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "public")));

// check login
app.use((req, res, next) => {
  const isLoggedIn = req.session.isLoggedIn || false;
  const userInfo = req.session.user || {};
  req.session.isLoggedIn = isLoggedIn;
  req.session.user = userInfo;

  res.locals.user = userInfo;

  if (req.path !== "/auth/sign-in" && !isLoggedIn) {
    return res.redirect("/auth/sign-in");
  }

  next();
});

app.use("/", router);

// connect db
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connect successfully");
  })
  .catch((error) => {
    console.log("Connect failed", error);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("App is running on port", PORT));
