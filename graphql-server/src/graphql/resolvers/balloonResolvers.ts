import { IBalloon } from '../../types/interfaces';
import Balloon from '../../models/balloon';
import { addBalloon } from '../../controllers/addBalloon';
import { isAuth } from '../../utils/isAuth';
import { validateBalloon } from '../../validators/validateBalloon';
import { getBalloon } from '../../controllers/getBalloon';

const resolvers = {
	Query: {
		getBalloons: async (_: undefined, {}, { token }: { token: string }) => {
			await isAuth(token);
			return await Balloon.find({});
		},
		getBalloon: async (
			_: undefined,
			{ balloonId }: { balloonId: string },
			{ token }: { token: string }
		) => {
			await isAuth(token);
			return await getBalloon(balloonId);
		},
	},
	Mutation: {
		addBalloon: async (
			_: undefined,
			{ balloon }: { balloon: IBalloon },
			{ token }: { token: string }
		) => {
			validateBalloon(balloon);
			await isAuth(token);
			return await addBalloon(balloon);
		},
	},
};

export default resolvers;
