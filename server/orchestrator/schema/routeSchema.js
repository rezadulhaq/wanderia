const axios = require("axios");
const redis = require("../configs/ioredis");

const routeTypeDefs = `#graphql
    type Route {
        _id: ID,
        name: String,
        latitude: Float,
        longitude: Float,
        address: String,
        tripId: String
    }

    type Message {
        message: String
    }

    input NewRoute {
        placeOfOrigin: String,
        destination: String,
    }

    type Query {
        allRoutes: [Route],
        allRoutesEachOneTrip(tripId: Int): [Route]
    }

    type Mutation {
        addNewTrip(input: NewRoute): Message
    }
`;

const routeResolver = {
    Query: {
        allRoutes: async () => {
            try {
                const cache = await redis.get("routes")
                if (cache) {
                    const data = await JSON.parse(cache)
                    return data
                } else {
                    const { data } = await axios.get(`${process.env.JOURNEY_URL}/routes`)
                    await redis.set("routes", JSON.stringify(data))
                    return data
                }
            } catch (error) {
                throw error.response.data
            }
        },
        allRoutesEachOneTrip: async (_, args) => {
            try {
                const { tripId } = args
                const { data } = await axios({
                    url: `${process.env.JOURNEY_URL}/routes/${tripId}`,
                });
                return data
            } catch (error) {
                throw error.response.data;
            }
        }
    },
    Mutation: {
        addNewTrip: async (_, args) => {
            try {
                const { placeOfOrigin, destination } = args.input
                const response = await axios({
                    method: "POST",
                    url: `${process.env.JOURNEY_URL}/routes`,
                    data: { placeOfOrigin, destination },
                })
                await redis.del('routes')
                return response.data
            } catch (error) {
                throw error.response.data;
            }
        }
    }
};

module.exports = { routeTypeDefs, routeResolver }