import MockAdapter from 'axios-mock-adapter';
import { axiosClient } from '../../../../../infrastructure/axios/client';
import Balloon from '../../../models/Balloon';
import { IBalloon } from '../../../models/interfaces';
import { MOCK_BALLOONS } from '../../common/mockBalloons';
import { getBalloon } from '../../helperFunctions';
import {
	MOCK_401,
	MOCK_401_RESPONSE,
	MOCK_404,
	MOCK_404_RESPONSE,
	MOCK_409_RESPONSE,
	MOCK_GLOBAL,
	MOCK_GLOBAL_RESPONSE,
} from './constants';

export const addBalloonMock = (balloon: IBalloon) => {
	const balloonObject = {
		id: balloon.id,
		name: balloon.name,
		description: balloon.description,
		type: balloon.type,
		color: balloon.color,
		position: {
			altitude: balloon.position!.altitude,
			latitude: balloon.position!.latitude,
			longitude: balloon.position!.longitude,
		},
	} as IBalloon;

	const mockAxios = new MockAdapter(axiosClient);
	mockAxios.onPost('Balloons', balloonObject).reply(() => {
		const isExistBalloon = balloonObject.id;
		const isNameExist = MOCK_BALLOONS.find((element) => {
			if (isExistBalloon)
				return (
					element.name === balloonObject.name &&
					element.id !== balloonObject.id
				);
			return element.name === balloonObject.name;
		});
		if (isNameExist) return MOCK_409_RESPONSE;
		if (MOCK_404) return MOCK_404_RESPONSE;
		if (MOCK_401) return MOCK_401_RESPONSE;
		if (MOCK_GLOBAL) return MOCK_GLOBAL_RESPONSE;

		let newBalloon;
		if (isExistBalloon) newBalloon = updateBalloon(balloonObject);
		else newBalloon = addNewBalloon(balloonObject);

		return [201, newBalloon];
	});
};

export const addNewBalloon = (newBalloon: IBalloon) => {
	const id = (MOCK_BALLOONS.length + 1).toString();
	const balloon = { ...newBalloon, id } as Balloon;
	MOCK_BALLOONS.push(balloon);
	return getBalloon(id);
};

export const updateBalloon = (updatedBalloon: IBalloon) => {
	const balloon = updatedBalloon as Balloon;
	MOCK_BALLOONS[parseInt(balloon.id) - 1] = {
		...MOCK_BALLOONS[parseInt(balloon.id) - 1],
		...balloon,
	};
	return getBalloon(balloon.id);
};
