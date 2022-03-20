import React from "react";
import { capitalizeFirstLetter } from "../../../utils/helperFunctions";
import { IBalloon } from "../models/interfaces";
import ActiveBalloonPos from "./ActiveBalloonPos";
import { Box, Card, CardContent, Typography } from "@mui/material";

type Props = {
  balloon: IBalloon;
};

const BalloonCard: React.FC<Props> = ({ balloon }) => {
  const { name, type, color, description } = balloon;
  return (
    <Card sx={{ altitude: "100%" }}>
      {balloon && (
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textTransform: "capitalize" }}
          >
            {name}
          </Typography>
          <Box display="flex" mb={1.5}>
            <Typography
              color="text.secondary"
              sx={{ textTransform: "capitalize", mr: 1 }}
            >
              Color: {color}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ textTransform: "capitalize" }}
            >
              | Type {type}
            </Typography>
          </Box>
          <Typography variant="body1">
            {capitalizeFirstLetter(description)}
          </Typography>
          <ActiveBalloonPos />
        </CardContent>
      )}
    </Card>
  );
};

export default BalloonCard;
