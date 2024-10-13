import express from "express";
import router from "./lib/router";
import path from "path";

const { PORT = 3001 } = process.env;
const session = require("express-session");
var passport = require("passport");

const app = express();

// Middleware that parses json and looks at requests where the Content-Type header matches the type option.

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve app production bundle
app.use(express.static("dist/app"));
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: true,
    saveUninitialized: false,
  })
);

app.use(passport.authenticate("session"));
app.use(passport.session());

// app.use(function (req: any, res, next) {
//   res.locals.login = req.isAuthenticated();
//   next();
// });

// Serve API requests from the router
app.use("/api", router);

passport.serializeUser(function (user: any, cb: any) {
  console.log("serialzing user", user);

  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user: any, cb: any) {
  console.log("!!123deserializing user", user);

  process.nextTick(function () {
    return cb(null, user);
  });
});

// Handle client routing, return all requests to the app
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "app/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
