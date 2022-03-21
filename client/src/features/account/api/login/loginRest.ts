import { AxiosResponse } from "axios";
import { axiosClient } from "../../../../infrastructure/axios/client";
import { USE_MOCK_SERVER } from "../../../../infrastructure/config";
import { loginMock } from "./mock/loginRestMock";
import { IUserCredentials, IUserData } from "../../models/interfaces";

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
