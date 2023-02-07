const axios = require("axios");
const redis = require("../configs/ioredis");

const { readFileSync } = require("fs"); // this is used to import the graphql schema definition

//contract
const preferencesTypeDefs = readFileSync(
  require.resolve("./types/preferences.graphql")
).toString("utf-8");

const preferencesResolver = {
  Query: {
    getAllPreferences: async (_, args, contextValue) => {
      try {
        const cache = await redis.get("preferences");
        if (cache) {
          const data = await JSON.parse(cache);
          return data;
        } else {
          const { data } = await axios({
            method: "GET",
            url: `${process.env.PREFERENCES_URL}/preferences`,
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
    registerNewPreferences: async (_, args) => {
      try {
        const response = await axios({
          method: "POST",
          url: `${process.env.PREFERENCES_URL}/preferences`,
          data: args.input,
        });
        await redis.del("preferences");
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    },
    // loginPreferences: async (_, args) => {
    //   try {
    //     const response = await axios({
    //       method: "POST",
    //       url: `${process.env.PREFERENCES_URL}/preferences/login`,
    //       data: args.input,
    //     });
    //     return response.data;
    //   } catch (error) {
    //     throw error.response.data;
    //   }
    // },
    updatePreferences: async (_, args, contextValue) => {
      try {
        const response = await axios({
          method: "PATCH",
          url: `${process.env.PREFERENCES_URL}/users/${args.input._id}`,
          data: { 
            ...args.input,
            _id: undefined // so that the _id is not updated
          },
          headers: {
            access_token: contextValue.token,
          }
        });
        await redis.del("preferences");
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    },
    /* updateUserRole: async (_, args, contextValue) => {
      try {
        const response = await axios({
          method: "PATCH",
          url: `${process.env.PREFERENCES_URL}/preferences/${args.input._id}/role/${args.input.role}`,
          headers: {
            access_token: contextValue.token,
          }
        });
        await redis.del("preferences");
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }, */
    deletePreferencesById: async (_, args, contextValue) => {
      try {
        const response = await axios({
          method: "DELETE",
          url: `${process.env.preferences_URL}/preferences/${args._id}`,
        });
        await redis.del("preferences");
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    },
  },
};

module.exports = { preferencesTypeDefs, preferencesResolver };
