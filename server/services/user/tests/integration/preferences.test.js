const chai = require("chai");
const { ObjectId } = require("mongodb");
const expect = chai.expect;
const request = require("supertest");
const app = require("../../app");
const { runConnection, getDatabase } = require("../../config/mongodb");


describe("Test GET /preferences endpoint", () => {
  it("should return an array of preferences with a 200 status code", async () => {
    const res = await request(app)
      .get("/preferences/")
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body[0]).to.have.property("_id");
    expect(res.body[0]).to.have.property("name");
    expect(res.body[0]).to.have.property("createdAt");
    expect(res.body[0]).to.have.property("updatedAt");
  });
});


// describe("Test GET /preferences/:id endpoint", () => {
//   it("should return a preferences object with a 200 status code", async () => {
//     const res = await request(app)
//       .get(`/preferences/`)
//     expect(res.statusCode).to.equal(200);
//     expect(res.body).to.be.an("object");
//     expect(res.body).to.have.property("_id");
//     expect(res.body).to.have.property("name", "John Doe");
//     expect(res.body).to.have.property("createdAt");
//     expect(res.body).to.have.property("updatedAt");
//   });

//   it("should return a 404 status code and an error message if the user is not found", async () => {
//     const res = await request(app)
//       .get(`/preferences/63dfc05501c2fb5814358f1e`)
//     expect(res.statusCode).to.equal(404);
//     expect(res.body).to.be.an("object");
//     expect(res.body).to.have.property("code", 404);
//     expect(res.body).to.have.property("message", "Not found");
//   })

//   it("should return a 500 status code and an error message if the user id is invalid", async () => {
//     const res = await request(app)
//       .get(`/preferences/invalid-preferences-id`)
//     expect(res.statusCode).to.equal(500);
//     expect(res.body).to.be.an("object");
//     expect(res.body).to.have.property("code", 500);
//     expect(res.body).to.have.property("message", "Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer");
//   })
// });

describe("Test GET /preferences/:id endpoint", () => {
  it("should return a preferences object with a 200 status code", async () => {
    const res = await request(app)
      .get(`/preferences/`)
    console.log(JSON.stringify(res.body))
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body[0]).to.be.an("object");
    expect(res.body[0]).to.have.property("_id");
    // expect(res.body[0]).to.have.property("name", "John Doe");
    expect(res.body[0]).to.have.property("createdAt");
    expect(res.body[0]).to.have.property("updatedAt");
  });

  it("should return a 404 status code and an error message if the user is not found", async () => {
    const res = await request(app)
      .get(`/preferences/63dfc05501c2fb5814358f1a`)
    expect(res.statusCode).to.equal(404);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("code", 404);
    expect(res.body).to.have.property("message", "Not found");
  })

  it("should return a 500 status code and an error message if the user id is invalid", async () => {
    const res = await request(app)
      .get(`/preferences/invalid-preferences-id`)
    expect(res.statusCode).to.equal(500);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("code", 500);
    expect(res.body).to.have.property("message", "Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer");
  })
});


