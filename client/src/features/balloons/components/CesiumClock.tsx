import React from "react";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { updateActiveBalloonPos } from "../slices/balloonsSlice";
import {
  JulianDate,
  ClockRange,
  Viewer as CesiumViewer,
  Cartographic,
  Math as MathCessium,
} from "cesium";
import { Clock, CesiumComponentRef } from "resium";
import { IPosition } from "../models/interfaces";

type Props = {
  mapRef: React.RefObject<CesiumComponentRef<CesiumViewer>>;
  start: JulianDate;
  stop: JulianDate;
};

const CesiumClock: React.FC<Props> = ({ mapRef, start, stop }) => {
  const dispatch = useAppDispatch();

  const updateActiveBaloonPosition = (clock: JulianDate) => {
    const entity = mapRef.current?.cesiumElement?.selectedEntity;
    if (entity) {
      const position = entity.position!.getValue(clock);
      const cartographicLocation = Cartographic.fromCartesian(position);
      const coords: IPosition = {
        latitude: MathCessium.toDegrees(cartographicLocation.latitude),
        longitude: MathCessium.toDegrees(cartographicLocation.longitude),
        altitude: MathCessium.toDegrees(cartographicLocation.height),
      };
      dispatch(updateActiveBalloonPos(coords));
    }
  };

  return (
    <Clock
      startTime={start.clone()}
      stopTime={stop.clone()}
      currentTime={start.clone()}
      multiplier={1}
      shouldAnimate={true}
      clockRange={ClockRange.LOOP_STOP}
      onTick={(clock) => updateActiveBaloonPosition(clock.currentTime)}
    />
  );
};

export default CesiumClock;
