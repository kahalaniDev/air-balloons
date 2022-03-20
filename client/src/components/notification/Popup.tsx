import React from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

type Props = {
  message: string;
  open: boolean;
  toggleOpen: () => void;
  severityType: AlertColor;
};

const Popup: React.FC<Props> = ({
  message,
  open,
  toggleOpen,
  severityType,
}) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={open}
      autoHideDuration={3000}
      onClose={toggleOpen}
      message={message}
    >
      <Alert
        elevation={6}
        variant="filled"
        severity={severityType}
        onClose={toggleOpen}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Popup;
