import { ApolloClient, gql } from "@apollo/client";
import { MockedResponse } from "@apollo/client/testing";
import { IBalloon } from "../../models/interfaces";
import {
  MOCK_EDIT_BALLOON_REQUEST,
  MOCK_EDIT_BALLOON_RESPONSE,
  MOCK_NEW_BALLOON_REQUESET,
  MOCK_NEW_BALLOON_RESPONSE,
} from "./mockConstants";

export const ADD_BALLOON_QUERY = gql`
  mutation AddBalloon($balloon: InputBalloon!) {
    addBalloon(balloon: $balloon) {
      id
      name
      description
      type
      color
    }
  }
`;

export const addBalloonGraphql = async (
  client: ApolloClient<object>,
  balloon: IBalloon
) => {
  const { data } = await client.mutate({
    mutation: ADD_BALLOON_QUERY,
    variables: { balloon },
  });
  return data.addBalloon;
};

type AddBalloonResponse = {
  addBalloon: IBalloon;
};

export const addBalloonGraphqlMock: MockedResponse<AddBalloonResponse>[] = [
  {
    request: {
      query: ADD_BALLOON_QUERY,
      variables: {
        balloon: MOCK_NEW_BALLOON_REQUESET,
      },
    },
    result: {
      data: { addBalloon: MOCK_NEW_BALLOON_RESPONSE },
    },
  },
  {
    request: {
      query: ADD_BALLOON_QUERY,
      variables: {
        balloon: MOCK_EDIT_BALLOON_REQUEST,
      },
    },
    result: {
      data: { addBalloon: MOCK_EDIT_BALLOON_RESPONSE },
    },
  },
];
