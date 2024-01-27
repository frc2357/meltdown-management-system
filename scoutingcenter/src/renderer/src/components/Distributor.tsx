import { Box, Button, ButtonGroup } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { ReactElement } from 'react';
import QRCode from 'react-qr-code';
import { Link } from 'react-router-dom';
import { TDownloadFunc } from '../../types/TDownloadFunc';
import { useDownloadFile } from '../hooks/useDownloadFile';

export const Distributor: React.FC = (): ReactElement => {
  const downloadFile: TDownloadFunc = useDownloadFile();

  const template: string =
    'match,red1,scout,red2,scout,red3,scout,blue1,scout,blue2,scout,blue3,scout';

  return (
    <Box sx={{ height: '100%', width: '100%', alignContent: 'center', alignItems: 'center' }}>
      <Typography variant="h4">Scouting Center</Typography>
      <Button variant="contained">Import CSV</Button>
      <Button
        variant="contained"
        onClick={(): void => downloadFile( 'eventName.csv', template)}
      >
        Download Template
      </Button>
      <Button variant="contained">Export Data</Button>
      <Button variant="contained" component={Link} to="/Capturer">
        Capturer
      </Button>
      <Box sx={{ alignItems: 'center', background: 'white', padding: '16px' }}>
        <QRCode value="qrContent" size={500} />
      </Box>
      <ButtonGroup variant="outlined">
        <Button>Prev</Button>
        <Button>Next</Button>
      </ButtonGroup>
    </Box>
  );
};
