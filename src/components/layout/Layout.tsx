import React from 'react';
import { Container, Typography, Box } from '@mui/material';

import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

const PricingLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box className={styles.background}>
      <Container maxWidth="lg">
        <Box textAlign="center" pt={4} pb={2}>
          <Typography variant="h4" component="h1">
            Choose Your Plan:
          </Typography>
        </Box>
        {children}
      </Container>
    </Box>
  );
};

export default PricingLayout;