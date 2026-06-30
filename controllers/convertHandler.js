"use strict";

function ConvertHandler() {
  // Read number from input
  this.getNum = function (input) {
    const result = input.match(/^[\d./]+/);

    // No number provided → default to 1
    if (!result) return 1;

    const num = result[0];

    // Reject double fractions (3/2/3)
    if ((num.match(/\//g) || []).length > 1) {
      return "invalid number";
    }

    let value;

    if (num.includes("/")) {
      const parts = num.split("/");

      value = parseFloat(parts[0]) / parseFloat(parts[1]);
    } else {
      value = parseFloat(num);
    }

    return isNaN(value) ? "invalid number" : value;
  };

  // Read unit from input
  this.getUnit = function (input) {
    const result = input.match(/[a-zA-Z]+$/);

    if (!result) return "invalid unit";

    let unit = result[0].toLowerCase();

    if (unit === "l") unit = "L";

    const validUnits = ["gal", "L", "mi", "km", "lbs", "kg"];

    return validUnits.includes(unit) ? unit : "invalid unit";
  };

  // Return opposite unit
  this.getReturnUnit = function (initUnit) {
    switch (initUnit) {
      case "gal":
        return "L";

      case "L":
        return "gal";

      case "mi":
        return "km";

      case "km":
        return "mi";

      case "lbs":
        return "kg";

      case "kg":
        return "lbs";

      default:
        return "invalid unit";
    }
  };

  // Spell out unit
  this.spellOutUnit = function (unit) {
    switch (unit) {
      case "gal":
        return "gallons";

      case "L":
        return "liters";

      case "mi":
        return "miles";

      case "km":
        return "kilometers";

      case "lbs":
        return "pounds";

      case "kg":
        return "kilograms";

      default:
        return "invalid unit";
    }
  };

  // Perform conversion
  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;

    switch (initUnit) {
      case "gal":
        result = initNum * galToL;
        break;

      case "L":
        result = initNum / galToL;
        break;

      case "mi":
        result = initNum * miToKm;
        break;

      case "km":
        result = initNum / miToKm;
        break;

      case "lbs":
        result = initNum * lbsToKg;
        break;

      case "kg":
        result = initNum / lbsToKg;
        break;

      default:
        return "invalid unit";
    }

    return Number(result.toFixed(5));
  };

  // Create response object
  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: `${initNum} ${this.spellOutUnit(
        initUnit,
      )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`,
    };
  };
}

module.exports = ConvertHandler;
