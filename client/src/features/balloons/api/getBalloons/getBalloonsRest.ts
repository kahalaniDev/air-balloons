import { AxiosResponse } from "axios";
import { axiosClient } from "../../../../infrastructure/axios/client";
import { getBalloonsMock } from "./mock/getBalloonsRestMock";
import { IBalloons } from "../../models/interfaces";
import { USE_MOCK_SERVER } from "../../../../infrastructure/config";

export const getBalloonsRest = async () => {
  if (USE_MOCK_SERVER) getBalloonsMock();
  const { data } = await axiosClient.get<
    IBalloons,
    AxiosResponse<IBalloons>,
    undefined
  >("Balloons");
  return data;
};
