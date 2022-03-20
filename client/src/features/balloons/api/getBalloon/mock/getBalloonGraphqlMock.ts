import { MockedResponse } from "@apollo/client/testing";
import { GET_BALLOON_QUERY } from "../getBalloonGraphql";
import { IBalloon } from "../../../models/interfaces";
import { getBalloon } from "../../helperFunctions";

type GetBalloonResponse = {
  getBalloon: IBalloon;
};

export const getBalloonGraphqlMock: MockedResponse<GetBalloonResponse>[] = [
  {
    request: {
      query: GET_BALLOON_QUERY,
      variables: { balloonId: "1" },
    },
    result: {
      data: { getBalloon: getBalloon("1") },
    },
  },
  {
    request: {
      query: GET_BALLOON_QUERY,
      variables: { balloonId: "2" },
    },
    result: {
      data: { getBalloon: getBalloon("2") },
    },
  },
  {
    request: {
      query: GET_BALLOON_QUERY,
      variables: { balloonId: "3" },
    },
    result: {
      data: { getBalloon: getBalloon("3") },
    },
  },
  {
    request: {
      query: GET_BALLOON_QUERY,
      variables: { balloonId: "4" },
    },
    result: {
      data: { getBalloon: getBalloon("4") },
    },
  },
  {
    request: {
      query: GET_BALLOON_QUERY,
      variables: { balloonId: "5" },
    },
    result: {
      data: { getBalloon: getBalloon("5") },
    },
  },
];
