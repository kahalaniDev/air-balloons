import { login } from "../../controllers/login";
import { validateUserCred } from "../../validators/validateUserCred";

const resolvers = {
  Mutation: {
    login: (_: undefined, userCred: { username: string; password: string }) => {
      validateUserCred(userCred);
      return login(userCred.username, userCred.password);
    },
  },
};

export default resolvers;
