const jwt = require("jsonwebtoken");

const secret = `wanderiasangatrahasia`;

const createToken = function (payload) {
    return jwt.sign(payload, secret);
};

const decodeToken = function (token) {
    return jwt.verify(token, secret);
};

module.exports = { createToken, decodeToken };
