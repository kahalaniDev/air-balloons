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

export interface IBalloons
  extends Array<{
    id: string;
    name: string;
    position: IPosition;
    type: string;
    color: string;
  }> {}
