import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";

export const LoginLayout = styled(Paper)(({ theme }) => ({
  maxWidth: "400px",
  alignSelf: "center",
  margin: `${theme.spacing(8)} 0`,
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));
