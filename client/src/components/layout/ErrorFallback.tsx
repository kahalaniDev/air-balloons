import React from "react";
import { Box, Typography } from "@mui/material";
import { FallbackProps } from "react-error-boundary";
import errorImg from "../../assets/images/error.svg";

const messages = ["Something Went Wrong", "Try To Refresh"];

const ErrorFallback: React.FC<FallbackProps> = () => {
  return (
    <Box pt={8} flexDirection="column" display="flex" alignItems="center">
      <Box
        width={{
          xs: "100%",
          sm: "80%",
        }}
        mb={2}
        maxHeight="50%"
      >
        <img
          src={errorImg}
          alt="error"
          style={{
            backgroundColor: "transparent",
            height: "100%",
            width: "100%",
          }}
        />
      </Box>
      {messages.map((message, index) => (
        <Typography
          key={`str#${index}-${message}`}
          variant="h3"
          color="text.secondary"
          maxHeight="20%"
          fontSize={{ xs: 32, sm: 40 }}
          lineHeight={1.3}
        >
          {message}
        </Typography>
      ))}
    </Box>
  );
};

export default ErrorFallback;
