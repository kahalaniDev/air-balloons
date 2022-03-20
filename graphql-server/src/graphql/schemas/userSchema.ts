import { gql } from "apollo-server-core";

const typeDefs = gql`
  type User {
    username: String!
    token: String!
  }

  type Mutation {
    login(username: String!, password: String!): User!
  }
`;

export default typeDefs;
