import { MockedResponse } from "@apollo/client/testing";
import { ADD_BALLOON_QUERY } from "../addBalloonGraphql";
import { IBalloon } from "../../../models/interfaces";
import { DEFAULT_BALLOON_ALTITUDE } from "../../../utils/constants";
import { BalloonColor, BalloonType } from "../../../models/enums";

type AddBalloonResponse = {
  addBalloon: IBalloon;
};

const MOCK_EDIT_BALLOON_REQUEST: IBalloon = {
  id: "1",
  name: "balloon-1",
  description: "big red balloon",
  type: BalloonType.Small,
  color: BalloonColor.Red,
  position: {
    altitude: DEFAULT_BALLOON_ALTITUDE,
    latitude: 0,
    longitude: 0,
  },
};

const MOCK_EDIT_BALLOON_RESPONSE = {
  id: "1",
  name: "balloon-1",
  description: "big red balloon",
  type: BalloonType.Small,
  color: BalloonColor.Red,
};

const MOCK_NEW_BALLOON_REQUESET: IBalloon = {
  id: "",
  name: "balloon-6",
  description: "test",
  type: BalloonType.Small,
  color: BalloonColor.White,
  position: {
    altitude: DEFAULT_BALLOON_ALTITUDE,
    latitude: 0,
    longitude: 0,
  },
};

const MOCK_NEW_BALLOON_RESPONSE: IBalloon = {
  id: "6",
  name: "balloon-6",
  description: "test",
  type: BalloonType.Small,
  color: BalloonColor.White,
};

export const addBalloonGraphqlMock: MockedResponse<AddBalloonResponse>[] = [
  {
    request: {
      query: ADD_BALLOON_QUERY,
      variables: {
        balloon: MOCK_NEW_BALLOON_REQUESET,
      },
    },
    result: {
      data: { addBalloon: MOCK_NEW_BALLOON_RESPONSE },
    },
  },
  {
    request: {
      query: ADD_BALLOON_QUERY,
      variables: {
        balloon: MOCK_EDIT_BALLOON_REQUEST,
      },
    },
    result: {
      data: { addBalloon: MOCK_EDIT_BALLOON_RESPONSE },
    },
  },
];
