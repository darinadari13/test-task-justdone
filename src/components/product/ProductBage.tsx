import React from 'react';

import { Badge } from '@mui/material';

type Title = 'Most Popular' | 'Save 90%' | 'Save 50%'

interface BageProps {
  title: Title;
}

const Bage: React.FC<BageProps> = ({ title }) => {
  return (
    <Badge
      badgeContent={title}
      color="primary"
      sx={{
      '& .MuiBadge-badge': {
        backgroundColor: '#00B39B',
        color: 'white',
        fontSize: '10px',
        fontWeight: 'bold',
        padding: '4px 8px',
        borderRadius: '8px',
        top: -10,
        right: -10,
      },
      }}
    />  
  )
}

export default Bage;
