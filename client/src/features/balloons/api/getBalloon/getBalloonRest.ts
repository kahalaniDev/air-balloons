import { AxiosResponse } from "axios";
import { axiosClient } from "../../../../infrastructure/axios/client";
import { getBalloonMock } from "./mock/getBalloonRestMock";
import { IBalloon } from "../../models/interfaces";

export const getBalloonRest = async (balloonId: string) => {
  getBalloonMock(balloonId);
  const { data } = await axiosClient.get<
    IBalloon,
    AxiosResponse<IBalloon>,
    undefined
  >(`Balloons/${balloonId}`);
  return data;
};
