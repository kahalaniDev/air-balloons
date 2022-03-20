import { AxiosResponse } from 'axios';
import { axiosClient } from '../../../../infrastructure/axios/client';
import { getBalloonMock } from './mock/getBalloonRestMock';
import { IBalloon } from '../../models/interfaces';
import { USE_MOCK_SERVER } from '../../../../infrastructure/config';

export const getBalloonRest = async (balloonId: string) => {
	if (USE_MOCK_SERVER) getBalloonMock(balloonId);
	const { data } = await axiosClient.get<
		IBalloon,
		AxiosResponse<IBalloon>,
		undefined
	>(`Balloons/${balloonId}`);
	return data;
};
