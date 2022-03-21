import { AxiosResponse } from "axios";
import MockAdapter from "axios-mock-adapter";
import { axiosClient } from "../../../../infrastructure/axios/client";
import { IUserCredentials, IUserData } from "../../models/interfaces";
import { USE_MOCK_SERVER } from "../../../../infrastructure/config";
import {
  MOCK_401_RESPONSE,
  MOCK_GLOBAL,
  MOCK_GLOBAL_RESPONSE,
  MOCK_JWT,
} from "./mockConstants";

export const loginRest = async (userCred: IUserCredentials) => {
  if (USE_MOCK_SERVER) loginMock(userCred);
  const { data } = await axiosClient.post<
    IUserData,
    AxiosResponse<IUserData>,
    IUserCredentials
  >("Users/login", userCred);
  axiosClient.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
  return data;
};

const loginMock = ({ username, password }: IUserCredentials) => {
  const mockAxios = new MockAdapter(axiosClient);
  mockAxios.onPost("Users/login", { username, password }).reply(() => {
    if (MOCK_GLOBAL) return MOCK_GLOBAL_RESPONSE;
    if (username === "daniel" && password === "!1234567")
      return [200, { username: "daniel", token: MOCK_JWT }];
    else return MOCK_401_RESPONSE;
  });
};
