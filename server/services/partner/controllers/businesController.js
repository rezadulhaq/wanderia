const { Partner, Business, Post, Category } = require("../models/index");
class BusinessController {
    static async createBusiness(req, res, next) {
        try {
            const {
                name,
                CategoryId,
                mapUrl,
                imageUrl,
                price,
                rating,
                address,
            } = req.body;
            const PartnerId = req.user.id;
            let check;
            mapUrl.split("/").map(function (el) {
                if (el.includes("@")) {
                    check = el.slice(1).split(",");
                }
            });
            let latitude = check[0];
            let longitude = check[1];
            const data = await Business.create({
                name,
                CategoryId,
                latitude,
                longitude,
                PartnerId,
                imageUrl,
                status: "active",
                price,
                rating,
                address,
            });
            res.status(201).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async editBusiness(req, res, next) {
        try {
            const id = req.params.id;
            const {
                name,
                CategoryId,
                mapUrl,
                imageUrl,
                price,
                rating,
                address,
            } = req.body;
            let check;
            mapUrl.split("/").map(function (el) {
                if (el.includes("@")) {
                    check = el.slice(1).split(",");
                }
            });
            let latitude = check[0];
            let longitude = check[1];
            const data = await Business.update(
                {
                    name,
                    CategoryId,
                    latitude,
                    longitude,
                    imageUrl,
                    price,
                    rating,
                    address,
                },
                {
                    where: {
                        id,
                    },
                }
            );
            res.status(201).json({message: "data berhasil di update"});
        } catch (error) {
            next(error);
        }
    }

    static async getAllBusinesses(req, res, next) {
        try {
            const data = await Business.findAll({
                include: [
                    {
                        model: Partner,
                        as: "author",
                        attributes: { exclude: ["password"] },
                    },
                    {
                        model: Category,
                        as: "category",
                    },
                    {
                        model: Post,
                        as: "posts",
                    },
                ],
                order: [["name", "ASC"]],
            });
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async getOneBusiness(req, res, next) {
        try {
            const { id } = req.params;

            const data = await Business.findByPk(id, {
                include: [
                    {
                        model: Partner,
                        as: "author",
                        attributes: { exclude: ["password"] },
                    },
                    {
                        model: Category,
                        as: "category",
                    },
                    {
                        model: Post,
                        as: "posts",
                    },
                ],
                order: [["name", "ASC"]],
            });
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
    // additional method
    static async getPartnerBusiness(req, res, next) {
        try {
            const PartnerId = req.user.id;
            const data = await Business.findAll({
                where: {
                    PartnerId,
                },
                include: [
                    {
                        model: Partner,
                        as: "author",
                        attributes: { exclude: ["password"] },
                    },
                    {
                        model: Category,
                        as: "category",
                    },
                    {
                        model: Post,
                        as: "posts",
                    },
                ],
                order: [["name", "ASC"]],
            });
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async updateStatus(req, res, next) {
        try {
            const { status } = req.body;
            const { id } = req.params;
            Business.update(
                {
                    status,
                },
                {
                    where: {
                        id,
                    },
                }
            );
        } catch (error) {
            next(error);
        }
    }
}

module.exports = BusinessController;
