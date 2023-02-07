const { hashPassword, compareHash } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const User = require("../models/users");
const bcrypt = require("bcryptjs");

class userController {
  static async findAllUser(req, res, next) {
    try {
      const dataUsers = await User.findAllUser();
      const response = dataUsers.map((user) => {
        return {
          ...user,

          password: undefined,
          created_at: undefined,
          createdAt: user.created_at || null,
          updatedAt: user.updatedAt || null,
        };
      });

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async registerUser(req, res, next) {
    try {
      const { email, password, phoneNumber, address, name, dateOfBirth } =
        req.body;
      const data = await User.createUser({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        phoneNumber,
        dateOfBirth,
        address,
        role: "user"
      });

      const newUser = await User.findUserByPk(data.insertedId);

      res.status(201).json({
        _id: data.insertedId,
        name,
        email,
        phoneNumber,
        dateOfBirth,
        address,
        role: "user",
        createdAt: newUser.created_at || null,
        updatedAt: null,
      });
    } catch (error) {
      next(error);
    }
  }

  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: `EmailRequired` };
      }
      if (!password) {
        throw { name: `PasswordRequired` };
      }

      const userFromMongoDb = await User.findUserByEmail(email);
      if (!userFromMongoDb) {
        throw { name: `InvalidCredentials` };
      }
      const compared = compareHash(password, userFromMongoDb.password);
      if (!compared) {
        throw { name: `InvalidCredentials` };
      }
      const payload = {
        id: userFromMongoDb._id,
        name: userFromMongoDb.name,
        email: userFromMongoDb.email,
        role: userFromMongoDb.role || "user",
      };
      const access_token = createToken(payload);

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async findUserByPk(req, res, next) {
    try {
      const { id } = req.params;
      const dataUser = await User.findUserByPk(id);
      if (!dataUser) {
        throw {
          name: "NotFound",
        };
      }

      const response = {
        ...dataUser,
        password: undefined,
        createdAt: dataUser.created_at,
        updatedAt: dataUser.updated_at || null,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateUserByPk(req, res, next) {
    try {
      const { id } = req.params;
      const { name, email, phoneNumber, address, dateOfBirth } = req.body;
      const dataUser = await User.findUserByPk(id);
      if (!dataUser) {
        throw {
          name: "NotFound",
        };
      }
      const data = await User.updateUser(id, {
        name,
        email,
        phoneNumber,
        address,
        dateOfBirth,
      });
      const response = {
        ...dataUser,
        name,
        email,
        phoneNumber,
        address,
        dateOfBirth,
        password: undefined,
        createdAt: dataUser.created_at,
        updatedAt: data.updated_at || null,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateUserRoleByPk(req, res, next) {
    try {
      const { id, role } = req.params;
      const listOfRole = ["superadmin", "user"];
      if (!listOfRole.includes(role)) {
        throw {
          name: "InvalidRole",
        };
      }

      // only superadmin can update role
      if(req.user.role !== "superadmin"){
        throw {
          name: "Unauthorized",
        };
      }

      const dataUser = await User.findUserByPk(id);
      if (!dataUser) {
        throw {
          name: "NotFound",
        };
      }
      const data = await User.updateUser(id, {
        role
      });
      const response = {
        ...dataUser,
        role,
        password: undefined,
        createdAt: dataUser.created_at,
        updatedAt: data.updated_at || null,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const dataUsers = await User.findUserByPk(id);
      if (!dataUsers) {
        throw {
          name: "NotFound",
        };
      }
      const data = await User.deleteUser(id);
      res.status(200).json({ message: " Successfully Deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = userController;
