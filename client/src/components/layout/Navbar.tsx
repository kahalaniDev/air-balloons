import React from "react";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { logout } from "../../features/account/slices/accountSlice";
import { AppBar, Button, Toolbar, Typography, Box } from "@mui/material";
import logo from "../../assets/images/logo.png";

type Props = {};

const Navbar: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { username } = useAppSelector((state) => state.account);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar color="default" position="static" sx={{ height: "10vh" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
        <img src={logo} alt="logo" height={100} />
        <Box display="flex">
          <Typography
            color="primary"
            variant="h5"
            sx={{ mr: 4, textTransform: "capitalize", fontWeight: "bold" }}
          >
            {username}
          </Typography>
          <Button color="primary" variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
