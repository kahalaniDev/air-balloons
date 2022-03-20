import { IPosition } from "./interfaces";

const DEFAULT_ALTITUDE = 2000;
const DEFAULT_LATITUDE = 34.73389066351245;
const DEFAULT_LONGITUDE = 37.43739229501583;

export default class Position implements IPosition {
  longitude: number;
  latitude: number;
  altitude: number;

  constructor(longitude?: number, latitude?: number, altitude?: number) {
    this.longitude =
      typeof longitude !== "undefined" && !isNaN(longitude)
        ? longitude
        : DEFAULT_LONGITUDE;
    this.latitude =
      typeof latitude !== "undefined" && !isNaN(latitude)
        ? latitude
        : DEFAULT_LATITUDE;
    this.altitude =
      typeof altitude !== "undefined" && !isNaN(altitude)
        ? altitude
        : DEFAULT_ALTITUDE;
  }
}
