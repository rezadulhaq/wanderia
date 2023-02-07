const { Category, Business, Partner, Post } = require("../models/index");
const { decodedToken } = require("../helpers/jwt");

async function authentication(req, res, next) {
    try {
        let access_token = req.headers.access_token;
        if (!access_token) {
            throw { name: "Unauthenticated" };
        }

        let payload = decodedToken(access_token);

        let user = await Partner.findByPk(payload.id);

        if (!user) {
            throw { name: "Unauthenticated" };
        }

        req.user = {
            id: user.id,
            name: user.name,
            email: user.email,
        };
        next();
    } catch (error) {
        next(error);
    }
}

async function authorization(req, res, next) {
    try {
        const { id } = req.params;

        const data = await Business.findOne({
            where: { id },
        });
        if (!data) {
            throw { name: `errorNotFound` };
        }
        if (req.user.id === data.PartnerId) {
            next();
        } else {
            throw { name: "Forbidden" };
        }
    } catch (error) {
        next(error);
    }
}

async function postAuthorization(req, res, next) {
    try {
        const { id } = req.params;

        const post = await Post.findOne({
            where: { id },
        });
        if (!post) {
            throw { name: `errorNotFound` };
        }
        const data = await Business.findOne({
            where: {
                id: post.BusinessId,
            },
        });
        if (!data) {
            throw { name: `errorNotFound` };
        }
        if (req.user.id === data.PartnerId) {
            next();
        } else {
            throw { name: "Forbidden" };
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    authentication,
    authorization,
    postAuthorization,
};
