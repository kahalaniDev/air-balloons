import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { ApolloProvider as ApolloNativeProvider } from "@apollo/client";
import { apolloClient } from "../../infrastructure/apollo/client";
import { loginGraphqlMock } from "../../features/account/api/login/loginGraphql";
import { getBalloonsGraphqlMock } from "../../features/balloons/api/getBalloons/getBalloonsGraphql";
import { getBalloonGraphqlMock } from "../../features/balloons/api/getBalloon/getBalloonGraphql";
import { addBalloonGraphqlMock } from "../../features/balloons/api/addBalloon/addBalloonGraphql";

interface Props {
  useMocks?: boolean;
}

const ApolloProvider: React.FC<Props> = ({ useMocks, children }) => {
  if (useMocks)
    return (
      <MockedProvider
        mocks={[
          ...loginGraphqlMock,
          ...getBalloonsGraphqlMock,
          ...getBalloonGraphqlMock,
          ...addBalloonGraphqlMock,
        ]}
      >
        <>{children}</>
      </MockedProvider>
    );
  return (
    <ApolloNativeProvider client={apolloClient}>
      <>{children}</>
    </ApolloNativeProvider>
  );
};

export default ApolloProvider;
