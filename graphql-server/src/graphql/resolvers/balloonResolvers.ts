import { IBalloon } from "../../types/interfaces";
import Balloon from "../../models/balloon";
import { addBalloon } from "../../controllers/addBalloon";
import { isAuth } from "../../utils/isAuth";
import { validateBalloon } from "../../validators/validateBalloon";

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
      return await Balloon.findById(balloonId);
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
      return addBalloon(balloon);
    },
  },
};

export default resolvers;
