import { GraphQLError } from "graphql";
import { GraphQLErrorArgs } from "graphql/error/GraphQLError";
import { ApolloClient, gql } from "@apollo/client";
import { MockedResponse } from "@apollo/client/testing";
import { IUserCredentials, IUserData } from "../../models/interfaces";
import { MOCK_JWT } from "./mockConstants";

export const LOGIN_QUERY = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      username
    }
  }
`;

export const loginGraphql = async (
  client: ApolloClient<object>,
  userCred: IUserCredentials
) => {
  const { data } = await client.mutate({
    mutation: LOGIN_QUERY,
    variables: userCred,
  });
  return data.login;
};

const args: GraphQLErrorArgs = {
  extensions: { code: "UNAUTHENTICATED", codeNum: 401 },
};

export const loginGraphqlMock: MockedResponse<{ login: IUserData }>[] = [
  {
    request: {
      query: LOGIN_QUERY,
      variables: { username: "daniel", password: "!1234567" },
    },
    result: {
      data: { login: { username: "daniel", token: MOCK_JWT } },
    },
  },
  {
    request: {
      query: LOGIN_QUERY,
      variables: { username: "avi", password: "!1234567" },
    },
    error: new Error("Network error"),
  },
  {
    request: {
      query: LOGIN_QUERY,
      variables: { username: "beni", password: "!1234567" },
    },
    result: {
      errors: [new GraphQLError("Incorrect username or password", args)],
    },
  },
];
