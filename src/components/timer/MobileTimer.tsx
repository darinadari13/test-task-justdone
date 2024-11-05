import React from 'react';
import { Box } from '@mui/material';

import Timer from './Timer';


interface MobileTimerProps {
  minutes: number;
  seconds: number;
}

const STYLES = {
  box: {
    width: '100%',
    height: '40px',
    borderRadius: '9px',
    overflow: 'hidden',
    marginBottom: '60px'
  },
}

const MobileTimer: React.FC<MobileTimerProps> = ({ minutes, seconds }) => {
  return (
    <Box sx={STYLES.box}>
      <Timer minutes={minutes} seconds={seconds} />
    </Box>
  );
};

export default MobileTimer;
