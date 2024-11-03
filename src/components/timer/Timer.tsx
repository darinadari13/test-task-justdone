import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import AcuteIcon from '../../assets/acute.svg';


interface TimerProps {
  minutes: number;
  seconds: number;
}

const STYLES = {
  box: {
    backgroundColor: 'black',
    color: 'white',
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: '16px',
    color: '#FFCC8F',
    fontWeight: 600,
    lineHeight: '24px',
    letterSpacing: '0.1px',
  }
}

const Timer: React.FC<TimerProps> = ({ minutes, seconds }) => {
  return (
    <Stack sx={STYLES.box} direction="row" spacing={1}>
      <AcuteIcon />
      <Typography variant="body2" sx={STYLES.text}>
        SALE ENDS IN
      </Typography>
      <Typography variant="body2" sx={STYLES.text}>
        {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </Typography>
    </Stack>
  );
};

export default Timer;
