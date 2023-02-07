const { Category, Business, Partner, Post } = require("../models/index");
class CategoryController {
    static async readCategory(req, res, next) {
        try {
            const data = await Category.findAll({
                include: [
                    {
                        model: Business,
                        as: "businesses",
                        include: [
                            {
                                model: Partner,
                                as: "author",
                                attributes: { exclude: ["password"] },
                            },
                            {
                                model: Post,
                                as: "posts",
                            },
                        ],
                        order: [["name", "ASC"]],
                    },
                ],
            });
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async readCategoryId(req, res, next) {
        try {
            const { id } = req.params;
            const data = await Category.findOne({
                where: { id },
                include: [
                    {
                        model: Business,
                        as: "businesses",
                        include: [
                            {
                                model: Partner,
                                as: "author",
                                attributes: { exclude: ["password"] },
                            },
                            {
                                model: Post,
                                as: "posts",
                            },
                        ],
                        order: [["name", "ASC"]],
                    },
                ],
            });
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = CategoryController;
