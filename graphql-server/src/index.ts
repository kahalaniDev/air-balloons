import "dotenv/config";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";
import { connect } from "mongoose";
import { typeDefs, resolvers } from "./graphql";
import { errorHandler } from "./utils/errorHandler";
import { loggerPlugin } from "./plugins/loggerPlugin";
import cors from "cors";

async function startApolloServer() {
  const mongoose = await connect(process.env.DB_URL as string);
  await mongoose.connection;

  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const headerValue = req.headers.authorization || "";
      if (headerValue) return { token: headerValue.split(" ")[1] };
      return { token: "" };
    },
    formatError: errorHandler,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), loggerPlugin],
  });

  await server.start();
  app.use(
    cors({
      credentials: true,
    })
  );
  server.applyMiddleware({ app, path: "/graphql" });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: process.env.PORT }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}/graphql`
  );
}

startApolloServer();
