import { Cartesian3, JulianDate, SampledPositionProperty } from "cesium";
import { IPosition } from "../models/interfaces";
import { TIME_STEP_IN_SECONDS } from "../utils/constants";

const addFilghtLocation = (
  index: number,
  { longitude, latitude, altitude }: IPosition,
  positionProperty: SampledPositionProperty,
  start: JulianDate
) => {
  const time = JulianDate.addSeconds(
    start,
    index * TIME_STEP_IN_SECONDS,
    new JulianDate()
  );
  const position = Cartesian3.fromDegrees(longitude, latitude, altitude);
  positionProperty.addSample(time, position);
};

const generateFlightLocations = ({
  longitude,
  latitude,
  altitude,
}: IPosition) => {
  const flightLocations = [];
  for (let i = 0; i <= 360; i += 10) {
    const altitudeOffest =
      i === 0 || i === 360 ? 0 : Math.floor(Math.random() * 1000);
    const radians = i * (Math.PI / 180);
    flightLocations.push({
      longitude: longitude - 0.1 + 0.1 * Math.cos(radians),
      latitude: latitude + 0.1 * Math.sin(radians),
      altitude: altitude + altitudeOffest,
    });
  }
  return flightLocations;
};

export const generateFlightData = (
  position: IPosition,
  positionProperty: SampledPositionProperty,
  start: JulianDate
) => {
  generateFlightLocations(position).forEach((flightLocation, index) =>
    addFilghtLocation(index, flightLocation, positionProperty, start)
  );
};
