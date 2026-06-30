const chai = require("chai");
const assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler");

const convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("Whole number input", () => {
    assert.equal(convertHandler.getNum("32L"), 32);
  });

  test("Decimal input", () => {
    assert.equal(convertHandler.getNum("3.5L"), 3.5);
  });

  test("Fractional input", () => {
    assert.equal(convertHandler.getNum("1/2kg"), 0.5);
  });

  test("Fractional with decimal", () => {
    assert.approximately(convertHandler.getNum("5.5/2kg"), 2.75, 0.01);
  });

  test("Double fraction invalid", () => {
    assert.equal(convertHandler.getNum("3/2/3kg"), "invalid number");
  });

  test("No number defaults to 1", () => {
    assert.equal(convertHandler.getNum("kg"), 1);
  });

  test("Valid units", () => {
    assert.equal(convertHandler.getUnit("32L"), "L");
    assert.equal(convertHandler.getUnit("32l"), "L");
  });

  test("Invalid unit", () => {
    assert.equal(convertHandler.getUnit("32g"), "invalid unit");
  });

  test("Return unit mapping", () => {
    assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
  });

  test("Spell out unit", () => {
    assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
  });

  test("Conversions", () => {
    assert.approximately(convertHandler.convert(1, "gal"), 3.78541, 0.1);
    assert.approximately(convertHandler.convert(1, "L"), 0.26417, 0.1);
    assert.approximately(convertHandler.convert(1, "mi"), 1.60934, 0.1);
    assert.approximately(convertHandler.convert(1, "km"), 0.62137, 0.1);
    assert.approximately(convertHandler.convert(1, "lbs"), 0.453592, 0.1);
    assert.approximately(convertHandler.convert(1, "kg"), 2.20462, 0.1);
  });
});
