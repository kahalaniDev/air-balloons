import React from "react";
import useAppSelector from "../../../hooks/useAppSelector";
import { Typography } from "@mui/material";

type Props = {};

const ActiveBalloonPos: React.FC<Props> = () => {
  const activeBalloonPos = useAppSelector(
    (state) => state.balloons.activeBalloonPos
  );

  return activeBalloonPos ? (
    <>
      <Typography variant="body1">
        Longitude {activeBalloonPos.longitude.toFixed(4)}
      </Typography>
      <Typography variant="body1">
        Latitude {activeBalloonPos.latitude.toFixed(4)}
      </Typography>
      <Typography variant="body1">
        Height {activeBalloonPos.altitude.toFixed(4)}
      </Typography>
    </>
  ) : null;
};

export default ActiveBalloonPos;
