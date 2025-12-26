const { ApolloServer } = require("apollo-server-express");
const mergeResolvers = require("../resolvers/indexResolver");
const mergeTypeDefs = require("../typeDefs/indextypeDef");
const userAuthMiddleware = require("../middleWare/authMiddleware");

const createGraphQLServer = async (app, io) => {

  const allowedOrigins = [
    'http://localhost:5173',
    'http://bondly.in',
    'https://bondly.in',
    process.env.CLIENT_URL,
  ].filter(Boolean);

  const apolloServer = new ApolloServer({
    typeDefs: mergeTypeDefs,
    resolvers: mergeResolvers,
    context: ({ req, res }) => {
      try {
        const user = userAuthMiddleware(req);
        return { res, user, io };
      } catch (err) {
        throw new Error(`Authentication failed: ${err.message}`);
      }
    },
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`CORS not allowed for origin: ${origin}`));
        }
      },
      credentials: true,
    },
  });

  console.log(`🚀 Apollo Server ready at /graphql`);
};

module.exports = createGraphQLServer;
