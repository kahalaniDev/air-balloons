import React, { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { useFormik, FormikHelpers } from "formik";
import { addBalloon, getBalloons, resetError } from "../slices/balloonsSlice";
import { logout } from "../../account/slices/accountSlice";
import { addBalloonGraphql } from "../api/addBalloon/addBalloonGraphql";
import { addBalloonRest } from "../api/addBalloon/addBalloonRest";
import { getBalloonsGraphql } from "../api/getBalloons/getBalloonsGraphql";
import { getBalloonsRest } from "../api/getBalloons/getBalloonsRest";
import { IAppError } from "../../../models/interfaces";
import { IBalloon, IPosition } from "../models/interfaces";
import Balloon from "../models/Balloon";
import { BalloonColor, BalloonType } from "../models/enums";
import { ACTIVE_SERVER, SERVER_TYPE } from "../../../infrastructure/config";
import { validationBalloonSchema } from "../utils/validators";
import FormButton from "../../../components/form/FormButton";
import FormError from "../../../components/form/FormError";
import SelectInput from "../../../components/form/SelectInput";
import { capitalizeFirstLetter } from "../../../utils/helperFunctions";
import {
  balloonInputArr,
  BalloonSelectInputProps,
  BalloonTextFieldProps,
} from "../utils/balloonFormInputs";
import { Grid, TextField } from "@mui/material";

type Props = {
  onSubmitFinish?: () => void;
  balloon: IBalloon | undefined;
  balloonPosition: IPosition | undefined;
  error: IAppError | undefined;
  loading: boolean;
};

const formErrorCodes = [404];
const ignoreErrorCodes = [409, 401];

export type BalloonFormValues = {
  name: string;
  description: string;
  latitude: string;
  longitude: string;
  type: string;
  color: string;
};

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

  const submitFormBalloon = async (
    inputBalloon: BalloonFormValues,
    FormikHelpers: FormikHelpers<BalloonFormValues>
  ) => {
    const resultAction = await dispatch(
      addBalloon({
        balloon: createBalloon(inputBalloon),
        addBallonRequest:
          ACTIVE_SERVER === SERVER_TYPE.GRAPHQL
            ? (balloon: IBalloon) => addBalloonGraphql(client, balloon)
            : addBalloonRest,
      })
    );
    if (addBalloon.fulfilled.match(resultAction)) handleAddBalloonSuccess();
    else if (
      !formErrorCodes.includes(resultAction.payload!.statusCode) &&
      !ignoreErrorCodes.includes(resultAction.payload!.statusCode)
    )
      handleGlobalError();
    else if (resultAction.payload!.statusCode === 409) {
      FormikHelpers.setFieldError("name", resultAction.payload!.message);
    } else if (resultAction.payload!.statusCode === 401) {
      handleUnauthorized();
    }
  };

  const createBalloon = (inputBalloon: BalloonFormValues) => {
    const balloonId = (balloon ? balloon.id : "") as string;
    return new Balloon(
      balloonId,
      inputBalloon.name,
      inputBalloon.description,
      inputBalloon.type as BalloonType,
      inputBalloon.color as BalloonColor,
      inputBalloon.longitude,
      inputBalloon.latitude
    );
  };

  const handleAddBalloonSuccess = () => {
    onSubmitFinish && onSubmitFinish();
    dispatch(
      getBalloons(
        ACTIVE_SERVER === SERVER_TYPE.GRAPHQL
          ? () => getBalloonsGraphql(client)
          : getBalloonsRest
      )
    );
  };

  const handleGlobalError = () => setPopupOpen(true);

  const handleUnauthorized = () => dispatch(logout());

  const formik = useFormik({
    initialValues: {
      name: balloon ? balloon.name : "",
      description: balloon ? balloon.description : "",
      latitude: balloonPosition ? balloonPosition.latitude.toFixed(4) : "",
      longitude: balloonPosition ? balloonPosition.longitude.toFixed(4) : "",
      type: balloon ? balloon.type : "",
      color: balloon ? balloon.color : "",
    },
    validationSchema: validationBalloonSchema,
    onSubmit: submitFormBalloon,
  });

  const isFormValuesChanged = () => {
    return (
      formik.initialValues.name !== formik.values.name ||
      formik.initialValues.description !== formik.values.description ||
      formik.initialValues.latitude !== formik.values.latitude ||
      formik.initialValues.longitude !== formik.values.longitude ||
      formik.initialValues.type !== formik.values.type ||
      formik.initialValues.color !== formik.values.color
    );
  };

  const generateTextField = (balloonInput: BalloonTextFieldProps) => (
    <TextField
      margin="normal"
      disabled={loading}
      {...formik.getFieldProps(balloonInput.name)}
      error={
        formik.touched[balloonInput.name] &&
        Boolean(formik.errors[balloonInput.name])
      }
      helperText={
        formik.touched[balloonInput.name] && formik.errors[balloonInput.name]
      }
      fullWidth
      label={capitalizeFirstLetter(balloonInput.name)}
      {...balloonInput.textFieldProps}
    />
  );

  const generateSelectInput = (balloonInput: BalloonSelectInputProps) => (
    <SelectInput
      label={capitalizeFirstLetter(balloonInput.name)}
      items={balloonInput.items}
      error={
        formik.touched[balloonInput.name] &&
        Boolean(formik.errors[balloonInput.name])
      }
      errorText={
        formik.touched[balloonInput.name] && formik.errors[balloonInput.name]
      }
      disabled={loading}
      selectInputProps={{
        name: balloonInput.name,
        value: formik.values[balloonInput.name],
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
      }}
    />
  );

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
      onSubmit={(evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        formik.handleSubmit();
      }}
      maxWidth={450}
    >
      {balloonInputArr.map((balloonInput) => (
        <Grid
          item
          {...balloonInput.gridProps}
          key={`${balloonInput.name} input`}
        >
          {balloonInput.type === "TextField"
            ? generateTextField(balloonInput)
            : generateSelectInput(balloonInput)}
        </Grid>
      ))}

      <Grid item xs={12}>
        <FormButton
          disabled={!isFormValuesChanged() || !formik.isValid}
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
