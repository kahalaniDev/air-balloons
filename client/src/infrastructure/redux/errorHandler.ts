import { ApolloError, isApolloError } from "@apollo/client";
import axios, { AxiosError } from "axios";
import { GraphQLError } from "graphql";
import { IAppError } from "../../models/interfaces";

const GLOBAL_STATUS_CODE = 500;
const INTERNAL_ERR_MSG = "Internal server problem, please try again";
const NEWTWORK_ERR_MSG = "Unable to access the server, please try again";

export const errorHandler = (err: unknown) => {
  if (axios.isAxiosError(err)) return axiosErrorBuilder(err);
  if (err instanceof Error && isApolloError(err))
    return apolloErrorBuilder(err);
  return {
    statusCode: 500,
    message: INTERNAL_ERR_MSG,
  };
};

const axiosErrorBuilder = (axiosError: AxiosError) => {
  console.log(axiosError);
  const statusText = axiosError.response?.statusText
    ? axiosError.response!.statusText
    : "";
  const statusCode = axiosError.response!.status;
  switch (statusText) {
    case "Not Found":
      return { statusCode, message: axiosError.response!.data };
    case "Bad Request":
      return { statusCode, message: axiosError.response!.data };
    case "Conflict":
      return { statusCode, message: axiosError.response!.data };
    case "Unauthorized":
      return { statusCode, message: axiosError.response!.data };
    default:
      return { statusCode, message: INTERNAL_ERR_MSG };
  }
  // return {
  //   statusCode: axiosError.response?.status
  //     ? axiosError.response?.data?.statusCode
  //     : axiosError.code,
  //   message: axiosError.response?.data?.message
  //     ? axiosError.response?.data?.message
  //     : INTERNAL_ERR_MSG,
  // };
};

const apolloErrorBuilder = (apolloError: ApolloError): IAppError => {
  if (apolloError.networkError)
    return { statusCode: GLOBAL_STATUS_CODE, message: NEWTWORK_ERR_MSG };
  if (apolloError.graphQLErrors)
    return graphqlErrorBuilder(apolloError.graphQLErrors[0]);
  return { statusCode: GLOBAL_STATUS_CODE, message: INTERNAL_ERR_MSG };
};

const graphqlErrorBuilder = (graphQLError: GraphQLError): IAppError => {
  const statusCode = graphQLError.extensions.codeNum as number;
  switch (graphQLError.extensions.code) {
    case "UNAUTHENTICATED":
    case "BAD_USER_INPUT":
      return { statusCode, message: graphQLError.message };
    default:
      return { statusCode, message: INTERNAL_ERR_MSG };
  }
};
