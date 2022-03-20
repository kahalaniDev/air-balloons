import MockAdapter from 'axios-mock-adapter';
import { axiosClient } from '../../../../../infrastructure/axios/client';
import { IUserCredentials } from '../../../models/interfaces';
import {
	MOCK_401_RESPONSE,
	MOCK_GLOBAL,
	MOCK_GLOBAL_RESPONSE,
	MOCK_JWT,
} from './mockConstants';

export const loginMock = ({ username, password }: IUserCredentials) => {
	const mockAxios = new MockAdapter(axiosClient);
	mockAxios.onPost('Users/login', { username, password }).reply(() => {
		if (MOCK_GLOBAL) return MOCK_GLOBAL_RESPONSE;
		if (username === 'daniel' && password === '!1234567')
			return [200, { username: 'daniel', token: MOCK_JWT }];
		else return MOCK_401_RESPONSE;
	});
};
