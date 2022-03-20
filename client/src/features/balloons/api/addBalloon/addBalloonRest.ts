import { AxiosResponse } from 'axios';
import { axiosClient } from '../../../../infrastructure/axios/client';
import { USE_MOCK_SERVER } from '../../../../infrastructure/config';
import { addBalloonMock } from './mock/addBalloonRestMock';
import { IBalloon } from '../../models/interfaces';

export const addBalloonRest = async (balloon: IBalloon) => {
	if (USE_MOCK_SERVER) addBalloonMock(balloon);
	const { data } = await axiosClient.post<
		IBalloon,
		AxiosResponse<IBalloon>,
		IBalloon
	>('Balloons', balloon);
	return data;
};
