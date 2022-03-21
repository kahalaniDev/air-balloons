import { ApolloClient, gql } from "@apollo/client";
import { MockedResponse } from "@apollo/client/testing";
import { getBalloons } from "../common/helperFunctions";
import { IBalloons } from "../../models/interfaces";

export const GET_BALLOONS_QUERY = gql`
  query GetBalloons {
    getBalloons {
      id
      name
      position {
        longitude
        latitude
        altitude
      }
      color
      type
    }
  }
`;

export const getBalloonsGraphql = async (client: ApolloClient<object>) => {
  const { data } = await client.query({
    query: GET_BALLOONS_QUERY,
    fetchPolicy: "network-only",
  });

  return data.getBalloons;
};

type GetBalloonsResponse = {
  getBalloons: IBalloons;
};

export const getBalloonsGraphqlMock: MockedResponse<GetBalloonsResponse>[] = [
  {
    request: {
      query: GET_BALLOONS_QUERY,
    },
    result: {
      data: { getBalloons: getBalloons() },
    },
  },
  {
    request: {
      query: GET_BALLOONS_QUERY,
    },
    result: {
      data: { getBalloons: getBalloons() },
    },
  },
  {
    request: {
      query: GET_BALLOONS_QUERY,
    },
    result: {
      data: { getBalloons: getBalloons() },
    },
  },
];
