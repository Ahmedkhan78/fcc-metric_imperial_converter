"use strict";

const ConvertHandler = require("../controllers/convertHandler");

module.exports = function (app) {
  const convertHandler = new ConvertHandler();

  app.get("/api/convert", (req, res) => {
    const input = req.query.input;

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    // Both invalid
    if (initNum === "invalid number" && initUnit === "invalid unit") {
      return res.send("invalid number and unit");
    }

    // Invalid number only
    if (initNum === "invalid number") {
      return res.send("invalid number");
    }

    // Invalid unit only
    if (initUnit === "invalid unit") {
      return res.send("invalid unit");
    }

    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);

    return res.json(
      convertHandler.getString(initNum, initUnit, returnNum, returnUnit),
    );
  });
};
