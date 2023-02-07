const axios = require("axios");
const redis = require("../configs/ioredis");

const { readFileSync } = require("fs"); // this is used to import the graphql schema definition

//contract
const userTypeDefs = readFileSync(
  require.resolve("./types/user.graphql")
).toString("utf-8");

const userResolver = {
  Query: {
    getAllUsers: async (_, args, contextValue) => {
      try {
        const cache = await redis.get("users");
        if (cache) {
          const data = await JSON.parse(cache);
          return data;
        } else {
          const { data } = await axios({
            method: "GET",
            url: `${process.env.USER_URL}/users`,
            headers: {
              access_token: contextValue.token,
            }
          });
          await redis.set("users", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        throw error.response.data;
      }
    },
  },
  Mutation: {
    registerNewUser: async (_, args) => {
      try {
        const response = await axios({
          method: "POST",
          url: `${process.env.USER_URL}/users`,
          data: args.input,
        });
        await redis.del("users");
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    },
    loginUser: async (_, args) => {
      try {
        const response = await axios({
          method: "POST",
          url: `${process.env.USER_URL}/users/login`,
          data: args.input,
        });
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    },
    updateUser: async (_, args, contextValue) => {
      try {
        const response = await axios({
          method: "PATCH",
          url: `${process.env.USER_URL}/users/${args.input._id}`,
          data: { 
            ...args.input,
            _id: undefined // so that the _id is not updated
          },
          headers: {
            access_token: contextValue.token,
          }
        });
        await redis.del("users");
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    },
    updateUserRole: async (_, args, contextValue) => {
      try {
        const response = await axios({
          method: "PATCH",
          url: `${process.env.USER_URL}/users/${args.input._id}/role/${args.input.role}`,
          headers: {
            access_token: contextValue.token,
          }
        });
        await redis.del("users");
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    },
    deleteUserById: async (_, args, contextValue) => {
      try {
        const response = await axios({
          method: "DELETE",
          url: `${process.env.USER_URL}/users/${args._id}`,
          headers: {
            access_token: contextValue.token,
          }
        });
        await redis.del("users");
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    },
  },
};

module.exports = { userTypeDefs, userResolver };
