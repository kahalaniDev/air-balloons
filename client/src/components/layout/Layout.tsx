import React from "react";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";
import { Box } from "@mui/material";

type Props = {};

const Layout: React.FC<Props> = () => {
  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Outlet />
      </ErrorBoundary>
    </Box>
  );
};

export default Layout;
