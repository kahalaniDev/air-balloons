import MockAdapter from "axios-mock-adapter";
import { axiosClient } from "../../../../../infrastructure/axios/client";
import Balloon from "../../../models/Balloon";
import { IBalloon } from "../../../models/interfaces";
import { MOCK_BALLOONS } from "../../common/mockBalloons";
import { getBalloon } from "../../helperFunctions";
import {
  MOCK_401,
  MOCK_401_RESPONSE,
  MOCK_404,
  MOCK_404_RESPONSE,
  MOCK_409_RESPONSE,
  MOCK_GLOBAL,
  MOCK_GLOBAL_RESPONSE,
} from "./constants";

export const addBalloonMock = (balloon: IBalloon) => {
  const mockAxios = new MockAdapter(axiosClient);
  mockAxios.onPost("Balloons", balloon).reply(() => {
    const isExistBalloon = balloon.id;
    const isNameExist = MOCK_BALLOONS.find((element) => {
      if (isExistBalloon)
        return element.name === balloon.name && element.id !== balloon.id;
      return element.name === balloon.name;
    });
    if (isNameExist) return MOCK_409_RESPONSE;
    if (MOCK_404) return MOCK_404_RESPONSE;
    if (MOCK_401) return MOCK_401_RESPONSE;
    if (MOCK_GLOBAL) return MOCK_GLOBAL_RESPONSE;

    let newBalloon;
    if (isExistBalloon) newBalloon = updateBalloon(balloon);
    else newBalloon = addNewBalloon(balloon);

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
