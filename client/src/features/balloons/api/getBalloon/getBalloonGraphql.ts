import { ApolloClient, gql } from "@apollo/client";
import { MockedResponse } from "@apollo/client/testing";
import { getBalloon } from "../common/helperFunctions";
import { IBalloon } from "../../models/interfaces";

export const GET_BALLOON_QUERY = gql`
  query GetBalloon($balloonId: String!) {
    getBalloon(balloonId: $balloonId) {
      id
      name
      description
      type
      color
    }
  }
`;

export const getBalloonGraphql = async (
  client: ApolloClient<object>,
  balloonId: string
) => {
  const { data } = await client.query({
    query: GET_BALLOON_QUERY,
    variables: { balloonId },
    fetchPolicy: "network-only",
  });
  return data.getBalloon;
};

type GetBalloonResponse = {
  getBalloon: IBalloon;
};

export const getBalloonGraphqlMock: MockedResponse<GetBalloonResponse>[] = [
  {
    request: {
      query: GET_BALLOON_QUERY,
      variables: { balloonId: "1" },
    },
    result: {
      data: { getBalloon: getBalloon("1") },
    },
  },
  {
    request: {
      query: GET_BALLOON_QUERY,
      variables: { balloonId: "2" },
    },
    result: {
      data: { getBalloon: getBalloon("2") },
    },
  },
  {
    request: {
      query: GET_BALLOON_QUERY,
      variables: { balloonId: "3" },
    },
    result: {
      data: { getBalloon: getBalloon("3") },
    },
  },
  {
    request: {
      query: GET_BALLOON_QUERY,
      variables: { balloonId: "4" },
    },
    result: {
      data: { getBalloon: getBalloon("4") },
    },
  },
  {
    request: {
      query: GET_BALLOON_QUERY,
      variables: { balloonId: "5" },
    },
    result: {
      data: { getBalloon: getBalloon("5") },
    },
  },
];
