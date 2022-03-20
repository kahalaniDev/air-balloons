import React from "react";
import useAppSelector from "../../../hooks/useAppSelector";
import useToggle from "../../../hooks/useToggle";
import BalloonDetails from "./BalloonDetails";
import BalloonList from "./BalloonList";
import Dialog from "../../../components/layout/Dialog";
import BalloonForm from "./BalloonForm";

import { Box } from "@mui/material";

type Props = {};

const BalloonsPanel: React.FC<Props> = () => {
  const { balloon, activeBalloonPos, loading, error, list } = useAppSelector(
    (state) => state.balloons
  );
  const [openBalloonDialog, toggleBalloonDialog] = useToggle([false, true]);

  return (
    <Box width="30%">
      {balloon ? (
        <BalloonDetails
          balloon={balloon}
          toggleEditBalloon={toggleBalloonDialog}
        />
      ) : (
        <BalloonList
          balloons={list}
          toggleCreateBalloon={toggleBalloonDialog}
        />
      )}
      <Dialog
        open={openBalloonDialog}
        handleClose={toggleBalloonDialog}
        title={balloon ? "Edit Balloon" : "Create Balloon"}
      >
        <BalloonForm
          balloon={balloon}
          balloonPosition={activeBalloonPos}
          onSubmitFinish={toggleBalloonDialog}
          error={error}
          loading={loading}
        />
      </Dialog>
    </Box>
  );
};

export default BalloonsPanel;
