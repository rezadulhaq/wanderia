const bcrypt = require("bcryptjs");

const hashPassword = function (password) {
    return bcrypt.hashSync(password, 10);
};

const compareHash = function (password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
};

module.exports = { hashPassword, compareHash };
