import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { useFormik } from "formik";
import useAppDispatch from "../../../hooks/useAppDispatch";
import useAppSelector from "../../../hooks/useAppSelector";
import { login, resetError } from "../slices/accountSlice";
import { loginGraphql } from "../api/login/loginGraphql";
import { loginRest } from "../api/login/loginRest";
import { validationLoginSchema } from "../utils/validators";
import { SERVER_TYPE, ACTIVE_SERVER } from "../../../infrastructure/config";
import { IUserCredentials } from "../models/interfaces";
import FormError from "../../../components/form/FormError";
import { Box, TextField } from "@mui/material";
import FormButton from "../../../components/form/FormButton";

type Props = {};

const formErrorCodes = [401];

const LoginForm: React.FC<Props> = () => {
  const client = useApolloClient();
  const [popupOpen, setPopupOpen] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => ({
    error: state.account.error,
    loading: state.account.loading,
  }));

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationLoginSchema,
    onSubmit: async (userCred) => {
      const resultAction = await dispatch(
        login({
          userCred,
          loginRequest:
            ACTIVE_SERVER === SERVER_TYPE.GRAPHQL
              ? (userCredentials: IUserCredentials) =>
                  loginGraphql(client, userCredentials)
              : loginRest,
        })
      );

      if (login.fulfilled.match(resultAction)) navigate("/");
      else if (!formErrorCodes.includes(resultAction.payload!.statusCode))
        setPopupOpen(true);
    },
  });

  const isFormValuesChanged = () => {
    return (
      formik.initialValues.username !== formik.values.username ||
      formik.initialValues.password !== formik.values.password
    );
  };

  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  return (
    <Box
      component="form"
      noValidate
      sx={{ mt: 1 }}
      onSubmit={formik.handleSubmit}
    >
      <TextField
        margin="normal"
        disabled={loading}
        {...formik.getFieldProps("username")}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
        fullWidth
        id="username"
        label="Username"
        autoComplete="username"
        autoFocus
      />
      <TextField
        margin="normal"
        disabled={loading}
        {...formik.getFieldProps("password")}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        fullWidth
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <FormButton
        title="Sign In"
        loading={loading}
        disabled={!isFormValuesChanged() || !formik.isValid}
      />
      <FormError
        popupOpen={popupOpen}
        closePopup={() => setPopupOpen(false)}
        error={error}
        formErrorCodes={formErrorCodes}
      />
    </Box>
  );
};

export default LoginForm;
