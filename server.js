"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const apiRoutes = require("./routes/api");
const fccTestingRoutes = require("./routes/fcctesting");
const runner = require("./test-runner");

const app = express();

// Static files
app.use("/public", express.static(process.cwd() + "/public"));

// Middleware
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Home page
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

// FCC testing routes
fccTestingRoutes(app);

// Register API routes
apiRoutes(app);

// 404
app.use((req, res) => {
  res.status(404).type("text").send("Not Found");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Listening on port " + port);

  if (process.env.NODE_ENV === "test") {
    console.log("Running Tests...");

    setTimeout(() => {
      try {
        runner.run();
      } catch (err) {
        console.error(err);
      }
    }, 1500);
  }
});

module.exports = app;
