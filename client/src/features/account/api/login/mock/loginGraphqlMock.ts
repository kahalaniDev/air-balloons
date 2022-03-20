import { MockedResponse } from "@apollo/client/testing";
import { LOGIN_QUERY } from "../loginGraphql";
import { MOCK_JWT } from "./mockConstants";
import { IUserData } from "../../../models/interfaces";
import { GraphQLError } from "graphql";
import { GraphQLErrorArgs } from "graphql/error/GraphQLError";

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
