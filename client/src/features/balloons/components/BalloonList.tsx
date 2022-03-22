import React from "react";
import { IBalloons } from "../models/interfaces";
import BalloonListItem from "./BalloonListItem";
import { Stack, Button, List } from "@mui/material";

type Props = {
  toggleCreateBalloon: () => void;
  balloons: IBalloons | [];
};

const BalloonList: React.FC<Props> = ({ balloons, toggleCreateBalloon }) => {
  return (
    <Stack py={2}>
      <Button
        variant="contained"
        sx={{ mx: 2, alignSelf: "flex-end" }}
        onClick={toggleCreateBalloon}
      >
        Create Balloon
      </Button>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {balloons.map((balloon) => (
          <BalloonListItem
            key={balloon.id}
            name={balloon.name}
            id={balloon.id}
          />
        ))}
      </List>
    </Stack>
  );
};

export default BalloonList;
