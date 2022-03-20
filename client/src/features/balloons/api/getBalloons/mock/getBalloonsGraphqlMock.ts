import { MockedResponse } from "@apollo/client/testing";
import { GET_BALLOONS_QUERY } from "../getBalloonsGraphql";
import { IBalloons } from "../../../models/interfaces";
import { getBalloons } from "./helperFunctions";

type GetBalloonsResponse = {
  getBalloons: IBalloons;
};

export const getBalloonsGraphqlMock: MockedResponse<GetBalloonsResponse>[] = [
  {
    request: {
      query: GET_BALLOONS_QUERY,
    },
    result: {
      data: { getBalloons: getBalloons() },
    },
  },
];
