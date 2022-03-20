import { BalloonColor, BalloonType } from "./enums";

export interface IPosition {
  longitude: number;
  latitude: number;
  altitude: number;
}

export interface IBalloon {
  id?: string;
  name: string;
  description: string;
  type: BalloonType;
  color: BalloonColor;
  position?: IPosition;
}
