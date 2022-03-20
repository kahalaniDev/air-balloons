import React from "react";
import { useApolloClient } from "@apollo/client";
import useAppSelector from "../../../hooks/useAppSelector";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { getBalloon } from "../slices/balloonsSlice";
import { getBalloonRest } from "../api/getBalloon/getBalloonRest";
import { getBalloonGraphql } from "../api/getBalloon/getBalloonGraphql";
import {
  JulianDate,
  SampledPositionProperty,
  TimeIntervalCollection,
  TimeInterval,
  PathGraphics,
  VelocityOrientationProperty,
  Color,
} from "cesium";
import { Entity } from "resium";
import { generateFlightData } from "../utils/flightFunctions";
import { IPosition } from "../models/interfaces";
import { BalloonType } from "../models/enums";
import { ACTIVE_SERVER, SERVER_TYPE } from "../../../infrastructure/config";

type Props = {
  start: JulianDate;
  stop: JulianDate;
  position: IPosition;
  id: string;
  type: string;
  color: string;
};

const balloon = require("../../../assets/models/balloon.glb");

const BalloonEntity: React.FC<Props> = ({
  start,
  stop,
  position,
  id,
  color,
  type,
}) => {
  const positionProperty = new SampledPositionProperty();
  const activeBalloonId = useAppSelector((state) => state.balloons.balloon?.id);
  generateFlightData(position, positionProperty, start);
  const dispatch = useAppDispatch();
  const client = useApolloClient();

  const convertTypeToSize = () => {
    const baseSize = 1280;
    switch (type) {
      case BalloonType.Small:
        return baseSize * 2;
      case BalloonType.Medium:
        return baseSize * 3;
      case BalloonType.Big:
        return baseSize * 4;
      case BalloonType.Double:
        return baseSize * 5;
      default:
        return baseSize;
    }
  };

  return (
    <Entity
      id={id}
      availability={
        new TimeIntervalCollection([new TimeInterval({ start, stop })])
      }
      position={positionProperty}
      model={{
        uri: balloon,
        minimumPixelSize: convertTypeToSize(),
        maximumScale: convertTypeToSize(),
        color: Color.fromCssColorString(color),
      }}
      orientation={new VelocityOrientationProperty(positionProperty)}
      path={new PathGraphics({ width: 3 })}
      selected={id === activeBalloonId}
      onClick={() =>
        dispatch(
          getBalloon({
            balloonId: id,
            getBallonRequest:
              ACTIVE_SERVER === SERVER_TYPE.APOLLO
                ? () => getBalloonGraphql(client, id)
                : getBalloonRest,
          })
        )
      }
    />
  );
};

export default BalloonEntity;
