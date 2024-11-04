import React from "react";
import { Card, CardContent, Typography, Box, Stack, Chip} from '@mui/material';
import { Feature } from "src/types/Feature";
import FeatureItem from "./FeatureItem";

interface FeaturesListProps {
  features: Feature[];
}

const STYLES = {
  containerMain: {
    textAlign: "center",
    marginBottom: '60px',
  },
  featuresContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 4,
  }
}

function FeaturesList({ features }: FeaturesListProps) {
  return (
    <Box sx={STYLES.containerMain}>
      <Box
        sx={STYLES.featuresContainer}
      >
        {features.map(({ icon, label, id }) => (
          <FeatureItem icon={icon} label={label} key={id}/>
        ))}
      </Box>
    </Box>
  );
}

export default FeaturesList;