import React from "react";
import LoginForm from "../components/LoginForm";
import { Avatar, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoginLayout } from "../styles/accountStyles";

type Props = {};

const LoginPage: React.FC<Props> = () => {
  return (
    <LoginLayout elevation={4}>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <LoginForm />
    </LoginLayout>
  );
};

export default LoginPage;
