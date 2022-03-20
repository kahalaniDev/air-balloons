import { AxiosResponse } from "axios";
import { axiosClient } from "../../../../infrastructure/axios/client";
import { getBalloonsMock } from "./mock/getBalloonsRestMock";
import { IBalloons } from "../../models/interfaces";

export const getBalloonsRest = async () => {
  getBalloonsMock();
  const { data } = await axiosClient.get<
    IBalloons,
    AxiosResponse<IBalloons>,
    undefined
  >("Balloons");
  return data;
};
