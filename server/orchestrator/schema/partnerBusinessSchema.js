const axios = require("axios");
const redis = require("../configs/ioredis");

const partnerBusinessTypeDefs = `#graphql
    type PartnerBusiness {
        id: ID,
        name: String,
        latitude: Float,
        longitude: Float,
        description: String,
        CategoryId: Int,
        PartnerId: Int,
        status: String,
        imageUrl: Text,
        rating: String
    }

    input NewPartnerBusiness {
        name: String,
        CategoryId: Int,
        mapUrl: String,
        imageUrl: Text,
        price: Int,
        rating: String,
        address: String,
        status: String
    }

    type Message {
        message: String
    }

    input EditPartnerBusiness {
        id: Int,
        name: String,
        description: String,
        CategoryId: Int,
        mapUrl: String,
        imageUrl: String,
        access_token: String
    }

    type Query {
        allPartnerBusiness: [PartnerBusiness],
        partnerBusiness(access_token: String): [PartnerBusiness]
        onePartnerBusiness(id: ID): PartnerBusiness
        detailBusiness(id: ID): PartnerBusiness
    }

    type Mutation {
        addNewPartnerBusiness(input: NewPartnerBusiness): PartnerBusiness,
        editPartnerBusiness(input: EditPartnerBusiness): Message
    }
`;

const partnerBusinessResolver = {
    Query: {
        allPartnerBusiness: async (_, args) => {
            try {
                const cache = await redis.get("partnerBusiness");
                if (cache) {
                    const data = await JSON.parse(cache);
                    return data;
                } else {
                    const { data } = await axios({
                        method: "GET",
                        url: `${process.env.PARTNER_URL}`,
                        // headers: {
                        //     access_token
                        // }
                    });
                    await redis.set("partnerBusiness", JSON.stringify(data));
                    return data;
                }
            } catch (error) {
                throw error.response.data;
            }
        },
        partnerBusiness: async (_, args) => {
            try {
                const { access_token } = args;
                const { data } = await axios({
                    method: "GET",
                    url: `${process.env.PARTNER_URL}/business`,
                    headers: {
                        access_token,
                    },
                });
                return data;
            } catch (error) {
                throw error.response.data;
            }
        },
        onePartnerBusiness: async (_, args) => {
            try {
                const { id } = args;
                const { data } = await axios({
                    method: "GET",
                    url: `${process.env.PARTNER_URL}/business/${id}`,
                });
                return data;
            } catch (error) {
                throw error.response.data;
            }
        },
        detailBusiness: async (_, args) => {
            try {
                const { id } = args;
                const { data } = await axios({
                    method: "GET",
                    url: `${process.env.PARTNER_URL}/business/${id}`,
                });
                return data;
            } catch (error) {
                throw error.response.data;
            }
        },
    },
    Mutation: {
        addNewPartnerBusiness: async (_, args) => {
            try {
                const {
                    name,
                    description,
                    CategoryId,
                    mapUrl,
                    PartnerId,
                    imageUrl,
                    access_token,
                } = args.input;
                const response = await axios({
                    method: "POST",
                    url: `${process.env.PARTNER_URL}/business`,
                    data: {
                        name,
                        description,
                        CategoryId,
                        mapUrl,
                        PartnerId,
                        imageUrl,
                    },
                    headers: {
                        access_token,
                    },
                });
                await redis.del("partnerBusiness");
                return response.data;
            } catch (error) {
                throw error.response.data;
            }
        },
        editPartnerBusiness: async (_, args) => {
            try {
                const {
                    id,
                    name,
                    description,
                    CategoryId,
                    mapUrl,
                    imageUrl,
                    access_token,
                } = args.input;
                const response = await axios({
                    method: "PATCH",
                    url: `${process.env.PARTNER_URL}/business/${id}`,
                    data: { name, description, CategoryId, mapUrl, imageUrl },
                    headers: {
                        access_token,
                    },
                });
                await redis.del("partnerBusiness");
                return response.data;
            } catch (error) {
                throw error.response.data;
            }
        },
    },
};

module.exports = { partnerBusinessTypeDefs, partnerBusinessResolver };
