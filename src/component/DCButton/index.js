import React from "react";
import { Button } from "@mui/material";

const DCButton = ({
  children,
  onClick,
  type = "button",
  color = "primary",
  variant = "contained",
  ...props
}) => {
  const buttonStyles = {
    // fontWeight: 800,
    // fontSize: "1.2rem",
    // padding: "0.8rem 1.6rem",
  };

  return (
    <Button
      type={type}
      color={color}
      variant={variant}
      onClick={onClick}
      sx={{ ...buttonStyles, ...props.sx }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default DCButton;
