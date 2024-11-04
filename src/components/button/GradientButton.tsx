import { Button, styled } from "@mui/material";
import React from "react";

const StyledButton = styled(Button)({
  background: "linear-gradient(90deg, var(--green-main-color) 0%, var(--blue-main-color) 100%), var(--grey-secondary-color)", 
  color: 'var(--white-main-color)',
  fontWeight: "bold",
  borderRadius: "50px", 
  padding: "16px 30px",
  textTransform: "none",
  width: '296px',
  height: '56px',
  "&:hover": {
    filter: 'contrast(0.7)', 
  },
});

interface GradientButtonProps {
  text: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({ text }) => {
  return <StyledButton>{text}</StyledButton>;
};

export default GradientButton;
