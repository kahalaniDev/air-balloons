import { AxiosResponse } from "axios";
import MockAdapter from "axios-mock-adapter";
import { axiosClient } from "../../../../infrastructure/axios/client";
import { getBalloons } from "../common/helperFunctions";
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

const getBalloonsMock = () => {
  const mockAxios = new MockAdapter(axiosClient);
  mockAxios.onGet("Balloons").reply(() => {
    return [200, getBalloons()];
  });
};
