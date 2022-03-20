import MockAdapter from "axios-mock-adapter";
import { axiosClient } from "../../../../../infrastructure/axios/client";
import { getBalloons } from "./helperFunctions";

export const getBalloonsMock = () => {
  const mockAxios = new MockAdapter(axiosClient);
  mockAxios.onGet("Balloons").reply(() => {
    return [200, getBalloons()];
  });
};
