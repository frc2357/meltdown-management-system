import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { ReactElement} from 'react';
export const ExampleTitle: React.FC = (): ReactElement => {
 
  return (
    <Box
      sx={{
        marginLeft: '16px',
        height: '100%',
        width: '100%',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4">Pit Management System: Workshop</Typography>
     </Box>
  );
};
