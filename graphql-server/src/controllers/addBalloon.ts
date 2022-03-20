import { UserInputError } from 'apollo-server-core';
import { IBalloon } from '../types/interfaces';
import Balloon from '../models/balloon';
import { ErrorMessages } from '../utils/constants';

export const addBalloon = async (balloon: IBalloon) => {
	const isExistBalloon = balloon.id ? true : false;
	const isInputValid = await isNameUnique(balloon, isExistBalloon);
	if (!isInputValid)
		throw new UserInputError(ErrorMessages.DuplicateName, { codeNum: 409 });
	if (isExistBalloon) return updateBalloon(balloon);
	else return createBalloon(balloon);
};

const isNameUnique = async (balloon: IBalloon, isExistBalloon: boolean) => {
	const similarBalloon = await Balloon.findOne({ name: balloon.name });
	if (isExistBalloon)
		return (
			!similarBalloon ||
			(similarBalloon && similarBalloon.id === balloon.id)
		);
	else return !similarBalloon;
};

const updateBalloon = async (balloon: IBalloon) => {
	const updatedBalloon = await Balloon.findByIdAndUpdate(
		balloon.id,
		{ ...balloon },
		{ runValidators: true, returnDocument: 'after' }
	);
	return updatedBalloon;
};

const createBalloon = async (balloon: IBalloon) => {
	const newBalloon = new Balloon(balloon);
	await newBalloon.save();
	return newBalloon;
};
