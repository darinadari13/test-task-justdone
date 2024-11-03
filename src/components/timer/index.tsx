import React from 'react';
import { Box, Typography } from '@mui/material';
import CustomClockIcon from './CustomClockIcon';


interface TimerProps {
  timeRemaining: string; 
}

const Timer: React.FC<TimerProps> = ({ timeRemaining }) => {
  return (
    <Box
      sx={{
        backgroundColor: 'black',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
        <CustomClockIcon />
      <Typography variant="body2" sx={{ fontSize: '16px', color: '#FFCC8F' }}>
        SALE ENDS IN {timeRemaining}
      </Typography>
    </Box>
  );
};

export default Timer;
