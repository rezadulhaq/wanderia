const axios = require("axios");
const redis = require("../configs/ioredis");

const partnerCategoryTypeDefs = `#graphql
    type PartnerCategory {
        name: String,
        symbol: String
    }

    type Query {
        allPartnerCategory(access_token: String): [PartnerCategory]
    }
`;

const partnerCategoryResolver = {
    Query: {
        allPartnerCategory: async (_, args) => {
            try {
                const { access_token } = args
                const cache = await redis.get("partnerCategories")
                if (cache) {
                    const data = await JSON.parse(cache)
                    return data
                } else {
                    const { data } = await axios({
                        method: 'GET',
                        url: `${process.env.PARTNER_URL}/categories`,
                        headers: {
                            access_token
                        }
                    })
                    await redis.set("partnerCategories", JSON.stringify(data))
                    return data
                }
            } catch (error) {
                throw error.response.data
            }
        }
    }
};

module.exports = { partnerCategoryTypeDefs, partnerCategoryResolver }