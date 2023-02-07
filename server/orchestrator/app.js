if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { partnerBusinessTypeDefs, partnerBusinessResolver } = require("./schema/partnerBusinessSchema");
const { partnerCategoryTypeDefs, partnerCategoryResolver } = require("./schema/partnerCategorySchema");
const { partnerPostTypeDef, partnerPostResolver } = require("./schema/partnerPostSchema");
const { partnerUserTypeDefs, partnerUserResolver } = require("./schema/partnerUserSchema");
const { routeTypeDefs, routeResolver } = require("./schema/routeSchema");
const { userTypeDefs, userResolver } = require("./schema/userSchema");

const port = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs: [routeTypeDefs, userTypeDefs, partnerUserTypeDefs, partnerBusinessTypeDefs, partnerCategoryTypeDefs, partnerPostTypeDef],
  resolvers: [routeResolver, userResolver, partnerUserResolver, partnerBusinessResolver, partnerCategoryResolver, partnerPostResolver],
  introspection: true,
});

const options = {
  context: ({ req }) => {
    const token = req.headers.access_token || "";
    return { token };
  },
  listen: { port },
};

startStandaloneServer(server, options)
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = server;
