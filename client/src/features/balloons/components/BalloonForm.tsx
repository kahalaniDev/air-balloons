import React, { useState, useEffect, FormEvent } from "react";
import { useApolloClient } from "@apollo/client";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { useFormik, FormikHelpers } from "formik";
import { addBalloon, getBalloons, resetError } from "../slices/balloonsSlice";
import { logout } from "../../account/slices/accountSlice";
import { addBalloonGraphql } from "../api/addBalloon/addBalloonGraphql";
import { addBalloonRest } from "../api/addBalloon/addBalloonRest";
import { getBalloonsGraphql } from "../api/getBalloons/getBalloonsGraphql";
import { getBalloonsRest } from "../api/getBalloons/getBalloonsRest";
// import useInput from "../../../hooks/useInput";
import useSelectInput from "../../../hooks/useSelectInput";
import { IAppError } from "../../../models/interfaces";
import { IBalloon, IPosition } from "../models/interfaces";
import Position from "../models/Position";
import Balloon from "../models/Balloon";
import { BalloonColor, BalloonType } from "../models/enums";
import { ACTIVE_SERVER, SERVER_TYPE } from "../../../infrastructure/config";
import { validationBalloonSchema } from "../utils/validators";
import BalloonInfoInputs from "./BalloonInfoInputs";
import BalloonPositionInputs from "./BalloonPositionInputs";
import FormButton from "../../../components/form/FormButton";
import FormError from "../../../components/form/FormError";
import { Grid, TextField } from "@mui/material";
import SelectInput from "../../../components/form/SelectInput";

type Props = {
  onSubmitFinish?: () => void;
  balloon: IBalloon | undefined;
  balloonPosition: IPosition | undefined;
  error: IAppError | undefined;
  loading: boolean;
};

const formErrorCodes = [404];
const ignoreErrorCodes = [409, 401];

type BalloonFormValues = {
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
    const balloonId = (balloon ? balloon.id : "") as string;
    const newBalloon = new Balloon(
      balloonId,
      inputBalloon.name,
      inputBalloon.description,
      inputBalloon.type as BalloonType,
      inputBalloon.color as BalloonColor,
      inputBalloon.longitude,
      inputBalloon.latitude
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
      FormikHelpers.setFieldError("name", resultAction.payload!.message);
    } else if (resultAction.payload!.statusCode === 401) {
      dispatch(logout());
    }
  };

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
      <Grid item xs={12}>
        <TextField
          margin="normal"
          disabled={loading}
          {...formik.getFieldProps("name")}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          fullWidth
          label="Name"
          autoFocus
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          margin="normal"
          disabled={loading}
          {...formik.getFieldProps("description")}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
          fullWidth
          label="Description"
        />
      </Grid>
      <Grid item xs={6}>
        <SelectInput
          label="Type"
          items={Object.keys(BalloonType)}
          error={formik.touched.type && Boolean(formik.errors.type)}
          errorText={formik.touched.type && formik.errors.type}
          disabled={loading}
          selectInputProps={{
            name: "type",
            value: formik.values.type,
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <SelectInput
          label="color"
          items={Object.keys(BalloonColor)}
          error={formik.touched.color && Boolean(formik.errors.color)}
          errorText={formik.touched.color && formik.errors.color}
          disabled={loading}
          selectInputProps={{
            name: "color",
            value: formik.values.color,
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
          }}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          margin="normal"
          disabled={loading}
          {...formik.getFieldProps("latitude")}
          error={formik.touched.latitude && Boolean(formik.errors.latitude)}
          helperText={formik.touched.latitude && formik.errors.latitude}
          label="Latitude"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          margin="normal"
          disabled={loading}
          {...formik.getFieldProps("longitude")}
          error={formik.touched.longitude && Boolean(formik.errors.longitude)}
          helperText={formik.touched.longitude && formik.errors.longitude}
          label="Longitude"
        />
      </Grid>
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
