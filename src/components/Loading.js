import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const Loading = () => {
  return (
    <Box sx={{ width: '50%' }}>
        <div className='loading'>Loading</div>
      <LinearProgress />
    </Box>
  );
}

export default Loading;

