import React from "react";
import { Dialog as MuiDialog, DialogContent, DialogTitle } from "@mui/material";

type Props = {
  title: string;
  open: boolean;
  handleClose: () => void;
};

const Dialog: React.FC<Props> = ({ title, open, handleClose, children }) => {
  return (
    <MuiDialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </MuiDialog>
  );
};

export default Dialog;
