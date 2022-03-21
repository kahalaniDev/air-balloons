import { AxiosResponse } from "axios";
import MockAdapter from "axios-mock-adapter";
import { axiosClient } from "../../../../infrastructure/axios/client";
import { getBalloon } from "../common/helperFunctions";
import { IBalloon } from "../../models/interfaces";
import { USE_MOCK_SERVER } from "../../../../infrastructure/config";

export const getBalloonRest = async (balloonId: string) => {
  if (USE_MOCK_SERVER) getBalloonMock(balloonId);
  const { data } = await axiosClient.get<
    IBalloon,
    AxiosResponse<IBalloon>,
    undefined
  >(`Balloons/${balloonId}`);
  return data;
};

const getBalloonMock = (balloonId: string) => {
  const mockAxios = new MockAdapter(axiosClient);
  mockAxios.onGet(`Balloons/${balloonId}`).reply(() => {
    const balloon = getBalloon(balloonId);
    return [200, balloon];
  });
};
