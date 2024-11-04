import React from 'react';
import { Container, Typography, Box } from '@mui/material';

import styles from './Layout.module.css';
import FeaturesList from 'src/components/feature/FeaturesList';
import features from 'src/data/features';

interface LayoutProps {
  children: React.ReactNode;
}

const STYLES = {
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  title: {
    fontSize: "45px",
    lineHeight: "52px",
    fontWeight: 600,
    color: "var(--text-accent-color)",
  }, 
  containerFeatures: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: '16px',
  },
  containerInner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "60px",
  }
}

const TITLE = "Choose Your Plan:"

const PricingLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box className={styles.background} sx={STYLES.mainContainer}>
      <Container sx={STYLES.containerInner}>
        <Box sx={STYLES.containerFeatures}>
          <Typography component="h1" sx={STYLES.title}>
            {TITLE}
          </Typography>
          <FeaturesList features={features}/>
        </Box>
        {children}
      </Container>
    </Box>
  );
};

export default PricingLayout;