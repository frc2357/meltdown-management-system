import { Box, Typography } from '@mui/material';
import { ReactElement } from 'react';

export function ErrorPage(): ReactElement {
  return (
    <Box sx={{ margin: 5 }}>
      <Typography variant="h1">You Had A System Meltdown</Typography>
      <Typography variant="h5" sx={{ marginLeft: 5 }}>
        Try closing and re-opening Overseer
      </Typography>
    </Box>
  );
}
