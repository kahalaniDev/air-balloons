import React from "react";
import { useApolloClient } from "@apollo/client";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { getBalloon } from "../slices/balloonsSlice";
import { getBalloonGraphql } from "../api/getBalloon/getBalloonGraphql";
import { getBalloonRest } from "../api/getBalloon/getBalloonRest";
import { ACTIVE_SERVER, SERVER_TYPE } from "../../../infrastructure/config";
import { ListItemButton, ListItemText } from "@mui/material";

type Props = { name: string; id: string };

const BalloonListItem: React.FC<Props> = ({ name, id }) => {
  const dispatch = useAppDispatch();
  const client = useApolloClient();

  return (
    <ListItemButton
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
    >
      <ListItemText primary={name} />
    </ListItemButton>
  );
};

export default BalloonListItem;
