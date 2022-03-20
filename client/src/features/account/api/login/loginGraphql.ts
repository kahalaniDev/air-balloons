import { ApolloClient, gql } from "@apollo/client";
import { IUserCredentials } from "../../models/interfaces";

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
