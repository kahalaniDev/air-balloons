import MockAdapter from "axios-mock-adapter";
import { axiosClient } from "../../../../../infrastructure/axios/client";
import { getBalloon } from "../../helperFunctions";

export const getBalloonMock = (balloonId: string) => {
  const mockAxios = new MockAdapter(axiosClient);
  mockAxios.onGet(`Balloons/${balloonId}`).reply(() => {
    const balloon = getBalloon(balloonId);
    return [200, balloon];
  });
};
