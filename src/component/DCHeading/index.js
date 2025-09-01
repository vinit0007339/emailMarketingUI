import React from "react";
import { Typography, Box, useTheme } from "@mui/material";

const DCHeading = ({
  title,
  children,
  ...props
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        borderRadius: 2,
        p: 2,
        bgcolor: theme.palette.background.secondary,
        color: theme.palette.text.default,
        ...props.sx, // This allows overrides including bg and color
      }}
    >
      <Typography variant="h5" fontWeight={600}>
        {title}
      </Typography>
    </Box>
  );
};

export default DCHeading;
