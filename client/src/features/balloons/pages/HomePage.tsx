import React, { useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { getBalloons } from "../slices/balloonsSlice";
import { getBalloonsGraphql } from "../api/getBalloons/getBalloonsGraphql";
import { getBalloonsRest } from "../api/getBalloons/getBalloonsRest";
import Navbar from "../../../components/layout/Navbar";
import Map from "../components/Map";
import { Box } from "@mui/material";
import { SERVER_TYPE, ACTIVE_SERVER } from "../../../infrastructure/config";
import BalloonsPanel from "../components/BalloonsPanel";

type Props = {};

const HomePage = (props: Props) => {
  const client = useApolloClient();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getBalloons(
        ACTIVE_SERVER === SERVER_TYPE.GRAPHQL
          ? () => getBalloonsGraphql(client)
          : getBalloonsRest
      )
    );
  }, [dispatch, client]);

  return (
    <>
      <Navbar />
      <Box flexGrow={1} display="flex">
        <Map />
        <BalloonsPanel />
      </Box>
    </>
  );
};

export default HomePage;
