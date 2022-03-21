import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import useAppDispatch from "../../../hooks/useAppDispatch";
import useAppSelector from "../../../hooks/useAppSelector";
import useInput from "../../../hooks/useInput";
import { login, resetError } from "../slices/accountSlice";
import { loginGraphql } from "../api/login/loginGraphql";
import { loginRest } from "../api/login/loginRest";
import { validateUsername, validatePassword } from "../utils/validators";
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
  const [
    username,
    handleUsernameChange,
    handleUsernameBlur,
    isUsernameValid,
    usernameError,
  ] = useInput("", validateUsername);

  const [
    password,
    handlePasswordChange,
    handlePasswordBlur,
    isPasswordValid,
    passwordError,
  ] = useInput("", validatePassword);

  const handleSubmit = async (evt: React.FormEvent) => {
    const passwordValid = isPasswordValid();
    const usernameValid = isUsernameValid();
    if (usernameValid && passwordValid) {
      const resultAction = await dispatch(
        login({
          userCred: {
            username,
            password,
          },
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
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  return (
    <Box component="form" noValidate sx={{ mt: 1 }} data-testid="form">
      <TextField
        margin="normal"
        disabled={loading}
        value={username}
        onChange={handleUsernameChange}
        onBlur={handleUsernameBlur}
        error={usernameError ? true : false}
        helperText={usernameError}
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
      />
      <TextField
        margin="normal"
        disabled={loading}
        value={password}
        onBlur={handlePasswordBlur}
        error={passwordError ? true : false}
        helperText={passwordError}
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        onChange={handlePasswordChange}
        autoComplete="current-password"
      />
      <FormButton
        handleSubmit={handleSubmit}
        title="Sign In"
        loading={loading}
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
