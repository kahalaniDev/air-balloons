import { ApolloClient, gql } from "@apollo/client";

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
