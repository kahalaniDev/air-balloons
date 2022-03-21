import { IBalloon } from "../../models/interfaces";
import { BalloonColor, BalloonType } from "../../models/enums";
import { DEFAULT_BALLOON_ALTITUDE } from "../../utils/constants";

export const BALLOON_DEFAULT_POSITIONS = {
  longitude: 37.43739229501583,
  latitude: 34.73389066351245,
  altitude: 10,
};

export const MOCK_404 = false;
export const MOCK_404_RESPONSE = [404, "Missing fields"];

export const MOCK_401 = false;
export const MOCK_401_RESPONSE = [401, "Unauthorized user"];

export const MOCK_GLOBAL = false;
export const MOCK_GLOBAL_RESPONSE = [500, "Unable to add Balloon"];

export const MOCK_409_RESPONSE = [409, "Name already exists"];

export const MOCK_EDIT_BALLOON_REQUEST: IBalloon = {
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

export const MOCK_EDIT_BALLOON_RESPONSE = {
  id: "1",
  name: "balloon-1",
  description: "big red balloon",
  type: BalloonType.Small,
  color: BalloonColor.Red,
};

export const MOCK_NEW_BALLOON_REQUESET: IBalloon = {
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

export const MOCK_NEW_BALLOON_RESPONSE: IBalloon = {
  id: "6",
  name: "balloon-6",
  description: "test",
  type: BalloonType.Small,
  color: BalloonColor.White,
};
