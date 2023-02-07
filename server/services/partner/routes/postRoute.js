const express = require("express");
const PostControler = require("../controllers/postConstroller");
const routerPost = express.Router();

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const {
    authorization,
    postAuthorization,
    authentication,
} = require("../middleware/auth");
cloudinary.config({
    cloud_name: "dcbsnkbgr",
    api_key: "663657673789959",
    api_secret: "moFond5Xm02MOA0JkD2P7l9c-3U",
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Wanderia",
    },
});
const upload = multer({ storage: storage });

routerPost.get("/", PostControler.getAllPost);
routerPost.use(authentication);
routerPost.post(
    "/add-post/:id",
    authorization,
    upload.array("imageUrl"),
    PostControler.createPost
);
routerPost.delete("/:id", postAuthorization, PostControler.deletePost);

module.exports = routerPost;
