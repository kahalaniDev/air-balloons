import { ApolloError, isApolloError } from '@apollo/client';
import axios, { AxiosError } from 'axios';
import { GraphQLError } from 'graphql';
import { IAppError } from '../../models/interfaces';

const GLOBAL_STATUS_CODE = 500;
const INTERNAL_ERR_MSG = 'Internal server problem, please try again';
const NEWTWORK_ERR_MSG = 'Unable to access the server, please try again';

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
	const statusCode = axiosError.response!.status;
	switch (statusCode) {
		case 401:
		case 409:
		default:
			return { statusCode, message: INTERNAL_ERR_MSG };
	}
};

const apolloErrorBuilder = (apolloError: ApolloError): IAppError => {
	if (apolloError.networkError)
		return { statusCode: GLOBAL_STATUS_CODE, message: NEWTWORK_ERR_MSG };
	return graphqlErrorBuilder(apolloError.graphQLErrors[0]);
};

const graphqlErrorBuilder = (graphQLError: GraphQLError): IAppError => {
	const statusCode = graphQLError.extensions.codeNum as number;
	switch (graphQLError.extensions.codeNum) {
		case 401:
		case 409:
			return { statusCode, message: graphQLError.message };
		default:
			return { statusCode, message: INTERNAL_ERR_MSG };
	}
};
