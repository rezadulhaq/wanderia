const chai = require("chai");
const { ObjectId } = require("mongodb");
const expect = chai.expect;
const request = require("supertest");
const app = require("../../app");
const { runConnection, getDatabase } = require("../../config/mongodb");

let userIdDuringTesting;
let accessTokenDuringTesting;
let superadminToken;

describe("Test POST /users endpoint", () => {
  it("should create a user and return with 201 status code and the created user data", async () => {
    const res = await request(app).post("/users").send({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password",
      phoneNumber: "1234567890",
      address: "123 Main St",
      dateOfBirth: "2000-01-01",
    });
    userIdDuringTesting = res.body._id;
    expect(res.statusCode).to.equal(201);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("_id");
    expect(res.body).to.have.property("name", "John Doe");
    expect(res.body).to.have.property("email", "johndoe@example.com");
    expect(res.body).to.not.have.property("password");
    expect(res.body).to.have.property("dateOfBirth", "2000-01-01");
    expect(res.body).to.have.property("role", "user");
    expect(res.body).to.have.property("createdAt");
    expect(res.body).to.have.property("updatedAt");
  });

  it("should return a 409 status code and an error message if the email is duplicated", async () => {
    const res = await request(app).post("/users").send({
      name: "Jane Doe",
      email: "johndoe@example.com",
      password: "password",
      phoneNumber: "0987654321",
      address: "456 Main St",
      dateOfBirth: "1998-01-01",
    });

    expect(res.statusCode).to.equal(409);
    // expect(res.body).to.have.property("message", "Email already exists"); // TODO: find better error message for duplicate
  });
});

describe("Test POST /users/login endpoint", () => {
  it("should return a 400 status code and an error message, if the email is missing", async () => {
    const res = await request(app).post("/users/login").send({
      password: "password",
    });
    expect(res.statusCode).to.equal(400);
    expect(res.body).to.have.property("code", 400);
    expect(res.body).to.have.property("message", "Email is required");
  });
  it("should return a 400 status code and an error message, if the password is missing", async () => {
    const res = await request(app).post("/users/login").send({
      email: "johndoeupdated@example.com",
    });
    expect(res.statusCode).to.equal(400);
    expect(res.body).to.have.property("code", 400);
    expect(res.body).to.have.property("message", "Password is required");
  });
  it("should return a 401 status code and an error message if the email is not found", async () => {
    const res = await request(app).post("/users/login").send({
      email: "janedoe@example.com",
      password: "password",
    });
    expect(res.statusCode).to.equal(401);
    expect(res.body).to.have.property("code", 401);
    expect(res.body).to.have.property("message", "Invalid email/password");
  });
  it("should return a 401 status code and an error message if the password is incorrect", async () => {
    const res = await request(app).post("/users/login").send({
      email: "johndoeupdated@example.com",
      password: "password-invalid",
    });
    expect(res.statusCode).to.equal(401);
    expect(res.body).to.have.property("code", 401);
    expect(res.body).to.have.property("message", "Invalid email/password");
  });
  it("should return a 200 status code and the user data if the email and password is correct", async () => {
    const res = await request(app).post("/users/login").send({
      email: "johndoe@example.com",
      password: "password",
    });
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("access_token");
    accessTokenDuringTesting = res.body.access_token;
  });
  it("should return a 200 status code if logging-in with a superadmin account", async () => {
    const res = await request(app).post("/users/login").send({
      email: "herlinalim93@gmail.com",
      password: "123456",
    });

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("access_token");
    superadminToken = res.body.access_token;
  });
});

describe("Test GET /users endpoint", () => {
  it("should return an error 401, because trying to access without token", async () => {
    const res = await request(app).get("/users/");
    expect(res.statusCode).to.equal(401);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("code", 401);
    expect(res.body).to.have.property("message", "Invalid token");
  });
  it("should return an array of users with a 200 status code", async () => {
    const res = await request(app)
      .get("/users/")
      .set("access_token", accessTokenDuringTesting);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body[0]).to.have.property("_id");
    expect(res.body[0]).to.have.property("name");
    expect(res.body[0]).to.have.property("email");
    expect(res.body[0]).to.not.have.property("password");
    expect(res.body[0]).to.have.property("dateOfBirth");
    expect(res.body[0]).to.have.property("createdAt");
    expect(res.body[0]).to.have.property("updatedAt");
  });
});

describe("Test GET /users/:id endpoint", () => {
  it("should return a user object with a 200 status code", async () => {
    const res = await request(app)
      .get(`/users/${userIdDuringTesting}`)
      .set("access_token", accessTokenDuringTesting);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("_id", userIdDuringTesting);
    expect(res.body).to.have.property("name", "John Doe");
    expect(res.body).to.have.property("email", "johndoe@example.com");
    expect(res.body).to.not.have.property("password");
    expect(res.body).to.have.property("dateOfBirth");
    expect(res.body).to.have.property("role");
    expect(res.body).to.have.property("createdAt");
    expect(res.body).to.have.property("updatedAt");
  });

  it("should return a 404 status code and an error message if the user is not found", async () => {
    const res = await request(app)
      .get(`/users/5f5c5d5b5a5f5c5d5b5a5f5c`)
      .set("access_token", accessTokenDuringTesting);
    expect(res.statusCode).to.equal(404);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("code", 404);
    expect(res.body).to.have.property("message", "Not found");
  })

  it("should return a 500 status code and an error message if the user id is invalid", async () => {
    const res = await request(app)
      .get(`/users/invalid-user-id`)
      .set("access_token", accessTokenDuringTesting);
    expect(res.statusCode).to.equal(500);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("code", 500);
    expect(res.body).to.have.property("message", "Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer");
  })
});

describe("Test PATCH /users/:id endpoint", () => {
  it("should update a user and return with 200 status code and the updated user data", async () => {
    const res = await request(app)
      .patch(`/users/${userIdDuringTesting}`)
      .set("access_token", accessTokenDuringTesting)
      .send({
        name: "John Doe Updated",
        email: "johndoeupdated@example.com",
        phoneNumber: "2345678901",
        address: "789 Main St",
        dateOfBirth: "2002-01-01",
      });
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("_id", userIdDuringTesting);
    expect(res.body).to.have.property("name", "John Doe Updated");
    expect(res.body).to.have.property("email", "johndoeupdated@example.com");
    expect(res.body).to.not.have.property("password");
    expect(res.body).to.have.property("phoneNumber", "2345678901");
    expect(res.body).to.have.property("address", "789 Main St");
    expect(res.body).to.have.property("dateOfBirth", "2002-01-01");
    expect(res.body).to.have.property("createdAt");
    expect(res.body).to.have.property("updatedAt");
  });
  it("should return a 404 status code and an error message if the user is not found", async () => {
    const res = await request(app)
      .patch(`/users/63da8d0c624ef9527e594d1a`)
      .set("access_token", accessTokenDuringTesting)
      .send({
        name: "John Doe Updated",
        email: "johndoeupdated@example.com",
        phoneNumber: "2345678901",
        address: "789 Main St",
        dateOfBirth: "2002-01-01",
      });
    expect(res.statusCode).to.equal(404);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("message", "Not found");
  });
  it("should return a 409 status code and an error message if the data is invalid", async () => {
    const res = await request(app)
      .patch(`/users/${userIdDuringTesting}`)
      .set("access_token", accessTokenDuringTesting)
      .send({
        email: "herlinalim93@gmail.com", // using an existing email, to trigger unique constraint error
      });
    expect(res.statusCode).to.equal(409);
    expect(res.body).to.be.an("object");
    // expect(res.body).to.have.property("message", "Invalid data"); // TODO: find better error message for duplicate
  });
});

describe("Test PATCH /users/:id/role/:role endpoint", async () => {
  it("should return a 403 status code with an error message if a user with role 'user' attempts to change their role.", async () => {
    const res = await request(app)
      .patch(`/users/${userIdDuringTesting}/role/user`)
      .set("access_token", accessTokenDuringTesting);
    expect(res.statusCode).to.equal(403);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("code", 403);
    expect(res.body).to.have.property("message", "Unauthorized");
  });
  it("should return a 200 status code if updating a user role with a superadmin", async () => {
    const roleName = "superadmin"
    const res = await request(app)
      .patch(`/users/${userIdDuringTesting}/role/${roleName}`)
      .set("access_token", superadminToken);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("role", roleName);
  });
  it("should return a 400 status code if updating a user role with an invalid role", async () => {
    const roleName = "invalid-role"
    const res = await request(app)
      .patch(`/users/${userIdDuringTesting}/role/${roleName}`)
      .set("access_token", superadminToken);
    expect(res.statusCode).to.equal(400);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("message", "Invalid role");
  });
  it("should return a 404 status code and an error message if the user is not found", async () => {
    const res = await request(app)
      .patch(`/users/63da8d0c624ef9527e594d1a/role/user`)
      .set("access_token", superadminToken);
    expect(res.statusCode).to.equal(404);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("message", "Not found");
  });
});

describe("Test DELETE /users/:id endpoint", () => {
  it("should return an error 404, because trying to delete a non-existent user", async () => {
    const res = await request(app)
      .delete("/users/63da8d0c624ef9527e594d1a")
      .set("access_token", accessTokenDuringTesting);
    expect(res.statusCode).to.equal(404);
    expect(res.body).to.have.property("code", 404);
    expect(res.body).to.have.property("message", "Not found");
  });
  it("should return a 200 status code and successfully deleted a user", async () => {
    const deleteRes = await request(app)
      .delete(`/users/${userIdDuringTesting}`)
      .set("access_token", accessTokenDuringTesting);
    expect(deleteRes.statusCode).to.equal(200);
  });
});

describe("Test GET /users endpoint (but with invalid token, because the user is deleted)", () => {
  it("should return an error 401, because trying to access without a valid token", async () => {
    const res = await request(app)
      .get("/users/")
      .set("access_token", accessTokenDuringTesting);
    expect(res.statusCode).to.equal(401);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("code", 401);
    expect(res.body).to.have.property("message", "Unauthenticated");
  });
});
