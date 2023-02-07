const axios = require("axios");
const redis = require("../configs/ioredis");

const cloudinary = require("cloudinary");


const partnerPostTypeDef = `#graphql
    type PartnerPost {
        id: ID,
        name: String,
        imageUrl: String,
        BusinessId: Int,
        link: Text
    }

    type Query {
        allPartnerPost(access_token: String): [PartnerPost] 
    }

    input NewPartnerPost {
        name: String,
        BusinessId: Int,
        access_token: String,
        photo: String,
        link: Text
    }

    type Mutation {
        uploadPhoto(input: NewPartnerPost): PartnerPost
    }
`;

const partnerPostResolver = {
    Query: {
        allPartnerPost: async (_, args) => {
            try {
                const { access_token } = args
                const cache = await redis.get("partnerPost")
                if (cache) {
                    const data = await JSON.parse(cache)
                    return data
                } else {
                    const { data } = await axios({
                        method: 'GET',
                        url: `${process.env.PARTNER_URL}/post`,
                        headers: {
                            access_token
                        }
                    })
                    await redis.set("partnerPost", JSON.stringify(data))
                    return data
                }
            } catch (error) {
                throw error.response.data
            }
        }
    },
    Mutation: {
        // addNewPartnerPost: async (_, args) => {
        //     try {
        //         const { name, BusinessId, access_token } = args.input
        //         const response = await axios({
        //             method: "POST",
        //             url: `${process.env.PARTNER_URL}/add-post/${BusinessId}`,
        //             data: { name },
        //             headers: {
        //                 access_token
        //             }
        //         })

        //     } catch (error) {
        //         throw error.response.data
        //     }
        // }
        uploadPhoto: async (_, args) => {
            const { name, BusinessId, access_token, photo } = args.input
            cloudinary.config({
                cloud_name: process.env.CLOUDINARY_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
            });
            try {
                const result = await cloudinary.v2.uploader.upload(photo, {
                    allowed_formats: ["jpg", "png"],
                    public_id: "",
                    folder: "Wanderia",
                });
                // return `Successful-Photo URL: ${result.url}`;
                const response = await axios({
                    method: 'POST',
                    url: `${process.env.PARTNER_URL}/post/add/${BusinessId}`,
                    data: { name, imageUrl: result.url },
                    headers: {
                        access_token
                    }
                })
                return response.data;
            } catch (error) {
                return `Image could not be uploaded:${error.message}`;
            }
        }
    }
}

module.exports = { partnerPostTypeDef, partnerPostResolver }