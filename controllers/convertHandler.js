"use strict";

class ConvertHandler {
  constructor() {
    this.unitMap = {
      gal: "L",
      L: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs",
    };

    this.spellOut = {
      gal: "gallons",
      L: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
    };
  }

  getNum(input) {
    if (!input) return "invalid number";

    const match = input.match(/^[\d./]+/);

    if (!match) return 1;

    const numStr = match[0];

    if ((numStr.match(/\//g) || []).length > 1) {
      return "invalid number";
    }

    let result;

    if (numStr.includes("/")) {
      const [a, b] = numStr.split("/");
      result = parseFloat(a) / parseFloat(b);
    } else {
      result = parseFloat(numStr);
    }

    if (isNaN(result)) return "invalid number";

    return result;
  }

  getUnit(input) {
    if (!input) return "invalid unit";

    const match = input.match(/[a-zA-Z]+$/);
    if (!match) return "invalid unit";

    let unit = match[0].toLowerCase();

    if (unit === "l") return "L";

    const valid = ["gal", "L", "mi", "km", "lbs", "kg"];

    return valid.includes(unit) ? unit : "invalid unit";
  }

  getReturnUnit(initUnit) {
    return this.unitMap[initUnit];
  }

  spellOutUnit(unit) {
    return this.spellOut[unit];
  }

  convert(initNum, initUnit) {
    const conv = {
      gal: 3.78541,
      L: 1 / 3.78541,
      mi: 1.60934,
      km: 1 / 1.60934,
      lbs: 0.453592,
      kg: 1 / 0.453592,
    };

    return parseFloat((initNum * conv[initUnit]).toFixed(5));
  }

  getString(initNum, initUnit, returnNum, returnUnit) {
    return {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`,
    };
  }
}

module.exports = ConvertHandler;
