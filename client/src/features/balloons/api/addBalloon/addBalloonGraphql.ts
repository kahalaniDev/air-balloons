import { ApolloClient, gql } from "@apollo/client";
import { IBalloon } from "../../models/interfaces";

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
