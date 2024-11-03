// src/components/product/ProductCard.tsx
import React from 'react';
import { Box } from '@mui/material';

import Timer from '../timer/Timer';


interface ProductCardTimerProps {
  minutes: number;
  seconds: number;
}

const STYLES = {
  boxMain: {
    position: 'relative',
  },
  triangle: {
    position: 'absolute',
    bottom: 0,
    right: '20px',
    transform: 'translateY(100%)',
    width: 0,
    height: 0,
    borderLeft: '8px solid transparent',
    borderRight: '8px solid transparent',
    borderTop: '8px solid red',
  },
  boxHidden: {
    height: '56px',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    overflow: 'hidden',
  }
}
const ProductCardTimer: React.FC<ProductCardTimerProps> = ({ minutes, seconds }) => {
  return (
    <Box sx={STYLES.boxMain}>
      <Box sx={STYLES.boxHidden}>
        <Timer minutes={minutes} seconds={seconds} />
      </Box>
      <Box sx={STYLES.triangle} />
    </Box>
  );
};

export default ProductCardTimer;
