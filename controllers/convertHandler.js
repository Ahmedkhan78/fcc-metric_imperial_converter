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
    let match = input.match(/^[\d./]+/);

    if (!match) return 1;

    let numStr = match[0];

    // invalid double fraction
    if ((numStr.match(/\//g) || []).length > 1) {
      return "invalid number";
    }

    let value;

    if (numStr.includes("/")) {
      const [a, b] = numStr.split("/");
      value = parseFloat(a) / parseFloat(b);
    } else {
      value = parseFloat(numStr);
    }

    if (isNaN(value)) return "invalid number";

    return value;
  }

  getUnit(input) {
    let match = input.match(/[a-zA-Z]+$/);
    if (!match) return "invalid unit";

    let unit = match[0];

    if (unit.toLowerCase() === "l") unit = "L";

    if (!this.unitMap[unit]) return "invalid unit";

    return unit;
  }

  getReturnUnit(initUnit) {
    return this.unitMap[initUnit];
  }

  spellOutUnit(unit) {
    return this.spellOut[unit];
  }

  convert(initNum, initUnit) {
    const conversions = {
      gal: 3.78541,
      L: 1 / 3.78541,
      mi: 1.60934,
      km: 1 / 1.60934,
      lbs: 0.453592,
      kg: 1 / 0.453592,
    };

    return parseFloat((initNum * conversions[initUnit]).toFixed(5));
  }

  getString(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  }
}

module.exports = ConvertHandler;
