import express from "express";
import router from "./lib/router";
import path from "path";

const { PORT = 3001 } = process.env;

const app = express();
var passport = require("passport");

// Middleware that parses json and looks at requests where the Content-Type header matches the type option.

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve API requests from the router
app.use("/api", router);

// Serve app production bundle
app.use(express.static("dist/app"));

var session = require("express-session");
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.authenticate("session"));

// Handle client routing, return all requests to the app
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "app/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
