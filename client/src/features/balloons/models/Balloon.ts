import { IBalloon, IPosition } from "./interfaces";
import { BalloonType, BalloonColor } from "./enums";
import Position from "./Position";

export default class Balloon implements IBalloon {
  id: string;
  name: string;
  description: string;
  type: BalloonType;
  color: BalloonColor;
  position: IPosition;

  constructor(
    id: string,
    name: string,
    description: string,
    type: BalloonType,
    color: BalloonColor,
    longitude: string,
    latitude: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.color = color;
    this.position = new Position(longitude, latitude);
  }
}
