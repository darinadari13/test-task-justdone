import React from 'react';
import Image from "next/image";
import {Box, Chip} from '@mui/material';

const BEST_VALUE_TITLE = 'Best Value'

const STYLES = {
  absoluteBestChip: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    right: '25px',
    transform: 'translateY(-80%) rotate(3deg)',
    '& .MuiChip-filled': {
      backgroundColor: 'var(--yellow-accent-color)',
      color: 'var(--text-accent-color)', 
      lineHeight: '30px',
      fontSize: "16px",
      fontWeight: "600",
      padding: "10px 23px",
      borderRadius: "55px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      height: '44px',
    },
    '& .MuiChip-label': {
      padding: 0,
      letterSpacing: '0.15px',
    },
    '& .MuiChip-avatar': {
      margin: 0,
    },
  }
}

const BestValueChip = () => {
  return (
    <Box sx={STYLES.absoluteBestChip}>
      <Chip label={BEST_VALUE_TITLE} color="success" 
        avatar={
          <Image src="/img/rocket.png" alt="Rocket Icon" width={25} height={31} />
        }/>
    </Box>
  )
}

export default BestValueChip;
