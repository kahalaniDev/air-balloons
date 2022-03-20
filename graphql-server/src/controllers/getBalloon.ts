import { UserInputError } from 'apollo-server-core';
import Balloon from '../models/balloon';
import { ErrorMessages } from '../utils/constants';

export const getBalloon = async (balloonId: string) => {
	const balloon = await Balloon.findById(balloonId);
	if (!balloon)
		throw new UserInputError(ErrorMessages.BalloonNotFound, {
			codeNum: 404,
		});
	return balloon;
};
