import React, { useEffect } from "react";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { resetBalloon } from "../slices/balloonsSlice";
import { IBalloon } from "../models/interfaces";
import BalloonCard from "./BalloonCard";
import { Box, Button } from "@mui/material";

type Props = { balloon: IBalloon; toggleEditBalloon: () => void };

const BalloonDetails: React.FC<Props> = ({ balloon, toggleEditBalloon }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetBalloon());
    };
  }, [dispatch]);

  return (
    <Box height="100%">
      <Box display="flex" justifyContent="space-between" p={2}>
        <Button variant="contained" onClick={() => dispatch(resetBalloon())}>
          Back
        </Button>
        <Button variant="contained" onClick={toggleEditBalloon}>
          Edit Balloon
        </Button>
      </Box>
      {balloon && <BalloonCard balloon={balloon} />}
    </Box>
  );
};

export default BalloonDetails;
