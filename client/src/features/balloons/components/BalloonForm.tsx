import React, { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { addBalloon, getBalloons, resetError } from "../slices/balloonsSlice";
import { logout } from "../../account/slices/accountSlice";
import { addBalloonGraphql } from "../api/addBalloon/addBalloonGraphql";
import { addBalloonRest } from "../api/addBalloon/addBalloonRest";
import { getBalloonsGraphql } from "../api/getBalloons/getBalloonsGraphql";
import { getBalloonsRest } from "../api/getBalloons/getBalloonsRest";
import useInput from "../../../hooks/useInput";
import useSelectInput from "../../../hooks/useSelectInput";
import { IAppError } from "../../../models/interfaces";
import { IBalloon, IPosition } from "../models/interfaces";
import Position from "../models/Position";
import Balloon from "../models/Balloon";
import { BalloonColor, BalloonType } from "../models/enums";
import { ACTIVE_SERVER, SERVER_TYPE } from "../../../infrastructure/config";
import {
  validateColor,
  validateDescription,
  validateLatitude,
  validateLongitude,
  validateName,
  validateType,
} from "../utils/validators";
import BalloonInfoInputs from "./BalloonInfoInputs";
import BalloonPositionInputs from "./BalloonPositionInputs";
import FormButton from "../../../components/form/FormButton";
import FormError from "../../../components/form/FormError";
import { Grid } from "@mui/material";

type Props = {
  onSubmitFinish?: () => void;
  balloon: IBalloon | undefined;
  balloonPosition: IPosition | undefined;
  error: IAppError | undefined;
  loading: boolean;
};

const formErrorCodes = [404];
const ignoreErrorCodes = [409, 401];

const BalloonForm: React.FC<Props> = ({
  balloon,
  balloonPosition,
  onSubmitFinish,
  error,
  loading,
}) => {
  const dispatch = useAppDispatch();
  const [popupOpen, setPopupOpen] = useState(false);
  const client = useApolloClient();

  const isValuesChangedUseState = useState(false);
  const [isValuesChanged] = isValuesChangedUseState;

  const nameUseInput = useInput(balloon ? balloon.name : "", validateName);
  const [name, , , isNameValid, , , setNameError] = nameUseInput;

  const descriptionUseInput = useInput(
    balloon ? balloon.description : "",
    validateDescription
  );
  const [description, , , isDescriptionValid, ,] = descriptionUseInput;

  const latitudeUseInput = useInput(
    balloonPosition ? balloonPosition.latitude.toFixed(4) : "",
    validateLatitude
  );
  const [latitude, , , isLatitudeValid, ,] = latitudeUseInput;

  const longitudeUseInput = useInput(
    balloonPosition ? balloonPosition.longitude.toFixed(4) : "",
    validateLongitude
  );
  const [longitude, , , isLongitudeValid, ,] = longitudeUseInput;

  const typeUseSelectInput = useSelectInput(
    balloon ? balloon.type : "",
    validateType
  );
  const [type, , , isTypeValid] = typeUseSelectInput;

  const colorUseSelectInput = useSelectInput(
    balloon ? balloon.color : "",
    validateColor
  );
  const [color, , , isColorValid] = colorUseSelectInput;

  const isFormValidate = () => {
    return (
      isValuesChanged &&
      isNameValid(false) &&
      isDescriptionValid(false) &&
      isTypeValid(false) &&
      isColorValid(false) &&
      isLatitudeValid(false) &&
      isLongitudeValid(false)
    );
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    const balloonId = (balloon ? balloon.id : "") as string;
    const balloonPos = new Position(
      parseFloat(longitude),
      parseFloat(latitude)
    );
    const newBalloon = new Balloon(
      balloonId,
      name,
      description,
      type as BalloonType,
      color as BalloonColor,
      balloonPos
    );
    const resultAction = await dispatch(
      addBalloon({
        balloon: newBalloon,
        addBallonRequest:
          ACTIVE_SERVER === SERVER_TYPE.GRAPHQL
            ? (balloon: IBalloon) => addBalloonGraphql(client, balloon)
            : addBalloonRest,
      })
    );
    if (addBalloon.fulfilled.match(resultAction)) {
      onSubmitFinish && onSubmitFinish();
      dispatch(
        getBalloons(
          ACTIVE_SERVER === SERVER_TYPE.GRAPHQL
            ? () => getBalloonsGraphql(client)
            : getBalloonsRest
        )
      );
    } else if (
      !formErrorCodes.includes(resultAction.payload!.statusCode) &&
      !ignoreErrorCodes.includes(resultAction.payload!.statusCode)
    )
      setPopupOpen(true);
    else if (resultAction.payload!.statusCode === 409) {
      setNameError(resultAction.payload!.message);
    } else if (resultAction.payload!.statusCode === 401) {
      dispatch(logout());
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  return (
    <Grid
      spacing={2}
      container
      component="form"
      noValidate
      sx={{ mt: 1 }}
      data-testid="form"
      maxWidth={450}
    >
      <BalloonInfoInputs
        nameUseInput={nameUseInput}
        descriptionUseInput={descriptionUseInput}
        typeUseSelectInput={typeUseSelectInput}
        colorUseSelectInput={colorUseSelectInput}
        disabled={loading}
        isValuesChangedUseState={isValuesChangedUseState}
      />
      <BalloonPositionInputs
        latitudeUseInput={latitudeUseInput}
        longitudeUseInput={longitudeUseInput}
        disabled={loading}
        isValuesChangedUseState={isValuesChangedUseState}
      />
      <Grid item xs={12}>
        <FormButton
          disabled={!isFormValidate()}
          handleSubmit={handleSubmit}
          title="Submit"
          loading={loading}
        />
        <FormError
          popupOpen={popupOpen}
          closePopup={() => setPopupOpen(false)}
          error={error}
          formErrorCodes={formErrorCodes}
        />
      </Grid>
    </Grid>
  );
};

export default BalloonForm;
