import { ApolloClient, gql } from "@apollo/client";

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
