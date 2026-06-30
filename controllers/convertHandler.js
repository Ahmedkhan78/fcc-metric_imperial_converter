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

    const match = input.match(/^[\d./]*/)[0];

    if (!match) return 1;

    if ((match.match(/\//g) || []).length > 1) {
      return "invalid number";
    }

    let num;

    if (match.includes("/")) {
      const [a, b] = match.split("/");
      num = parseFloat(a) / parseFloat(b);
    } else {
      num = parseFloat(match);
    }

    if (isNaN(num)) return "invalid number";

    return num;
  }

  getUnit(input) {
    if (!input) return "invalid unit";

    const match = input.match(/[a-zA-Z]+$/);
    if (!match) return "invalid unit";

    let unit = match[0];

    unit = unit.toLowerCase();

    if (unit === "l") unit = "L";

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
    const formatUnit = (u) => (u === "L" ? "L" : u.toLowerCase());

    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  }
}

module.exports = ConvertHandler;
