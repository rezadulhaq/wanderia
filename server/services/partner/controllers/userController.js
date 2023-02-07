const { compareHash } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { Partner } = require("../models/index");
class UserController {
    static async register(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const data = await Partner.create({ name, email, password });
            res.status(201).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email) {
                throw { name: `EmailRequired` };
            }
            if (!password) {
                throw { name: `PasswordRequired` };
            }

            const partner = await Partner.findOne({ where: { email } });
            if (!partner) {
                throw { name: `InvalidCredentials` };
            }
            const compared = compareHash(password, partner.password);
            if (!compared) {
                throw { name: `InvalidCredentials` };
            }
            const payload = { id: partner.id, name: partner.name };
            const access_token = createToken(payload);

            res.status(200).json({ access_token });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;
