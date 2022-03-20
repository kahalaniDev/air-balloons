import React from "react";
import { IAppError } from "../../models/interfaces";
import Popup from "../notification/Popup";
import { Typography } from "@mui/material";

type Props = {
  popupOpen: boolean;
  closePopup: () => void;
  error: IAppError | undefined;
  formErrorCodes: number[];
  ignoreErrorCodes?: number[];
};

const FormError: React.FC<Props> = ({
  popupOpen,
  closePopup,
  error,
  formErrorCodes,
  ignoreErrorCodes = [],
}) => {
  return (
    <>
      <Popup
        message={
          error &&
          !ignoreErrorCodes.includes(error.statusCode) &&
          !formErrorCodes.includes(error.statusCode)
            ? error.message
            : ""
        }
        open={popupOpen}
        toggleOpen={closePopup}
        severityType="error"
      />
      {error && formErrorCodes.includes(error.statusCode) && (
        <Typography color="error" variant="body2">
          {error!.message}
        </Typography>
      )}
    </>
  );
};

export default React.memo(
  FormError,
  (prevProps, nextProps) =>
    prevProps.error === nextProps.error &&
    prevProps.popupOpen === nextProps.popupOpen &&
    prevProps.formErrorCodes === nextProps.formErrorCodes &&
    prevProps.ignoreErrorCodes === nextProps.ignoreErrorCodes
);
