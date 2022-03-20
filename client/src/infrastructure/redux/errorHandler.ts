import { ApolloError, isApolloError } from '@apollo/client';
import axios, { AxiosError } from 'axios';
import { IAppError } from '../../models/interfaces';

const GLOBAL_STATUS_CODE = 500;
const INTERNAL_ERR_MSG = 'Internal server problem, please try again';
const NEWTWORK_ERR_MSG = 'Unable to access the server, please try again';

export const errorHandler = (err: unknown) => {
	if (axios.isAxiosError(err)) return axiosErrorBuilder(err);
	if (err instanceof Error && isApolloError(err))
		return apolloErrorBuilder(err);
	return { statusCode: GLOBAL_STATUS_CODE, message: INTERNAL_ERR_MSG };
};

const axiosErrorBuilder = (axiosError: AxiosError) => {
	return serverErrorBuilder(
		axiosError.response!.data,
		axiosError.response!.status
	);
};

const apolloErrorBuilder = (apolloError: ApolloError): IAppError => {
	if (apolloError.networkError)
		return { statusCode: GLOBAL_STATUS_CODE, message: NEWTWORK_ERR_MSG };

	const graphQLError = apolloError.graphQLErrors[0];
	return serverErrorBuilder(
		graphQLError.message,
		graphQLError.extensions.codeNum as number
	);
};

const serverErrorBuilder = (message: string, statusCode: number): IAppError => {
	switch (statusCode) {
		case 401:
		case 409:
			return { statusCode, message };
		default:
			return { statusCode, message: INTERNAL_ERR_MSG };
	}
};
