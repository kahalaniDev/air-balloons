import { IBalloon, IPosition } from "./interfaces";
import { BalloonType, BalloonColor } from "./enums";

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
    position: IPosition
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.color = color;
    this.position = position;
  }
}
