import React from "react";
import { Box, Button, CircularProgress } from "@mui/material";

type Props = {
  loading: boolean;
  title: string;
  disabled?: boolean;
};

const FormButton: React.FC<Props> = ({ loading, title, disabled = false }) => {
  return (
    <Box display="flex" justifyContent="center" mt={3} mb={1}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Button
          disabled={disabled}
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          sx={{ py: 1 }}
        >
          {title}
        </Button>
      )}
    </Box>
  );
};

export default FormButton;
