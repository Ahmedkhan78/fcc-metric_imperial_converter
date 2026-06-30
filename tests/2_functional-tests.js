const chaiHttp = require("chai-http");
const chai = require("chai");
const server = require("../server");

chai.use(chaiHttp);
const assert = chai.assert;

suite("Functional Tests", function () {
  test("Convert a valid input such as 10L", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=10L")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "initNum");
        assert.property(res.body, "returnNum");
        done();
      });
  });

  test("Convert an invalid input such as 32g", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=32g")
      .end((err, res) => {
        assert.equal(res.body.error, "invalid unit");
        done();
      });
  });

  test("Convert an invalid number such as 3/7.2/4kg", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kg")
      .end((err, res) => {
        assert.equal(res.body.error, "invalid number");
        done();
      });
  });

  test("Convert invalid number and unit such as 3/7.2/4kilomegagram", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kilomegagram")
      .end((err, res) => {
        assert.equal(res.body.error, "invalid number and unit");
        done();
      });
  });

  test("Convert with no number such as kg", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=kg")
      .end((err, res) => {
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, "kg");
        done();
      });
  });
});
