const { Post, Business } = require("../models");

class PostControler {
    static async getAllPost(req, res, next) {
        try {
            const data = await Post.findAll();
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async createPost(req, res, next) {
        try {
            // let { name } = req.body;
            // let images = req.files;
            const { id } = req.params;

            // const postImagesData = images.map((image) => {
            //     return {
            //         name,
            //         imageUrl: image.path,
            //         BusinessId: id,
            //     };
            // });

            // const dataPost = await Post.bulkCreate(postImagesData);
            // res.status(201).json(dataPost);
            const { name, imageUrl } = req.body
            const dataPost = await Post.create({ name, imageUrl, BusinessId: id });
            res.status(201).json(dataPost);
        } catch (error) {
            next(error);
        }
    }

    static async deletePost(req, res, next) {
        try {
            const { id } = req.params;
            const dataPost = await Post.findByPk(id);
            if (!dataPost) {
                throw { name: "errorNotFound" };
            }
            await Post.destroy({ where: { id } });
            res.status(200).json({ message: "Success to Delete" });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = PostControler;
