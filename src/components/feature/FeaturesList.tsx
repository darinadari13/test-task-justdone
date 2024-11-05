import React from "react";
import Marquee from "react-fast-marquee";
import { Box, Stack } from '@mui/material';

import FeatureItem from "./FeatureItem";
import breakpoints from "src/styles/breakpoints";
import useResponsive from "src/hooks/useResponsive";
import { Feature } from "src/types/Feature";
import { ScreenType } from "src/types/common";

interface FeaturesListProps {
  features: Feature[];
}

const STYLES = {
  listWrapper: {
    width: '100vw',
    marginBottom: '60px',
    [breakpoints.mobile]: {
      marginBottom: '40px',
    }
  }
}

function FeaturesList({ features }: FeaturesListProps) {
  const screenType = useResponsive()
  const isMobile = screenType === ScreenType.Mobile;

  if (screenType === null) {
    console.warn('screenType is not initialized');
    return null;
  }
  
  return (
    <Box sx={STYLES.listWrapper}>
      {
        isMobile ? (
          <Marquee>
            {features.map(({ icon, label, id }) => (
              <FeatureItem icon={icon} label={label} key={id}/>
            ))}
          </Marquee>
        ) : (
          <Stack direction="row" spacing={2} justifyContent='center'>
            {features.map(({ icon, label, id }) => (
              <FeatureItem icon={icon} label={label} key={id}/>
            ))}
          </Stack>
        )
      }
    </Box>
  );
}

export default FeaturesList;