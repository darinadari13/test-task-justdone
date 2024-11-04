import React from "react";
import { Typography, Box} from '@mui/material';

interface FeatureItemProps {
  icon: JSX.Element;
  label: string;
}

const STYLES = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    padding: "16px 0",
    marginLeft: '24px',
  },
  label: {
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: 600,
    color: "var(--grey-main-color)",
    whiteSpace: "nowrap",
  },
  icon: {
    width: "18px",
    height: "20px",
  }
}

function FeatureItem({ icon, label }: FeatureItemProps) {
  return (
    <Box sx={STYLES.container}>
      <Box sx={STYLES.icon}>{icon}</Box>
      <Typography sx={STYLES.label}>{label}</Typography>
    </Box>
  );
}

export default FeatureItem;
