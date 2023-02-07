const User = require("../models/users");
const { decodeToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    // if theres no access token in header, then this function below will return an "JsonWebTokenError"
    const adminObjectFromToken = decodeToken(access_token);

    // cek dulu di database usernya ada apa engga
    const adminFoundInDB = await User.findUserByPk(adminObjectFromToken.id);

    if (adminFoundInDB) {
      // IF KETEMU = maka set req.user = berisi usernya
      req.user = adminFoundInDB;
      // lakukan next() supaya lanjut ke controller endpoint nya
      return next();
    } else {
      // IF GAK KETEMU = maka return 401 unauthorized
      throw { name: "Unauthenticated" };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
