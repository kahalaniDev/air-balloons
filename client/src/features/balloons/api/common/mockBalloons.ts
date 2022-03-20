import Balloon from "../../models/Balloon";
import { BalloonColor, BalloonType } from "../../models/enums";

export const MOCK_BALLOONS: Balloon[] = [
  {
    id: "1",
    name: "balloon-1",
    description: "big red balloon",
    type: BalloonType.Big,
    color: BalloonColor.Red,
    position: {
      longitude: 34.779049390936045,
      latitude: 32.084581564540734,
      altitude: 1000,
    },
  },
  {
    id: "2",
    name: "balloon-2",
    description: "small blue balloon",
    type: BalloonType.Small,
    color: BalloonColor.Blue,
    position: {
      longitude: 34.01977713220543,
      latitude: 30.62269939585882,
      altitude: 1000,
    },
  },
  {
    id: "3",
    name: "balloon-3",
    description: "medium green balloon",
    type: BalloonType.Medium,
    color: BalloonColor.Black,
    position: {
      longitude: 35.89880998208067,
      latitude: 31.574191003859262,
      altitude: 1000,
    },
  },
  {
    id: "4",
    name: "balloon-4",
    description: "big white balloon",
    type: BalloonType.Big,
    color: BalloonColor.White,
    position: {
      longitude: 33.11768707092145,
      latitude: 34.935797531637306,
      altitude: 1000,
    },
  },
  {
    id: "5",
    name: "balloon-5",
    description: "small yellow balloon",
    type: BalloonType.Small,
    color: BalloonColor.Blue,
    position: {
      longitude: 37.43739229501583,
      latitude: 34.73389066351245,
      altitude: 1000,
    },
  },
];
