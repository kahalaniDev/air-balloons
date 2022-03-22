import { IPosition } from "./interfaces";

const DEFAULT_LONGITUDE = 37.43739229501583;
const DEFAULT_LATITUDE = 34.73389066351245;
const DEFAULT_ALTITUDE = 2000;

export default class Position implements IPosition {
  longitude: number;
  latitude: number;
  altitude: number;

  constructor(longitudeStr: string, latitudeStr: string) {
    const longitude = parseFloat(longitudeStr);
    const latitude = parseFloat(latitudeStr);
    this.longitude = isNaN(longitude) ? DEFAULT_LONGITUDE : longitude;
    this.latitude = isNaN(latitude) ? DEFAULT_LATITUDE : latitude;
    this.altitude = DEFAULT_ALTITUDE;
  }
}
