"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const apiRoutes = require("./routes/api.js");
const fccTestingRoutes = require("./routes/fcctesting.js");
const runner = require("./test-runner");

const app = express();

// Static files
app.use("/public", express.static(process.cwd() + "/public"));

// CORS for FCC tests
app.use(cors({ origin: "*" }));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Home route
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

// FCC testing routes
fccTestingRoutes(app);

// ✅ IMPORTANT FIX: mount router correctly
app.use("/api", apiRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).type("text").send("Not Found");
});

// Server start
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Listening on port " + port);

  if (process.env.NODE_ENV === "test") {
    console.log("Running Tests...");
    setTimeout(() => {
      try {
        runner.run();
      } catch (e) {
        console.error("Tests failed to run:", e);
      }
    }, 1500);
  }
});

module.exports = app;
