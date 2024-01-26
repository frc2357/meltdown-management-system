import { Box, Button, ButtonGroup, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { ReactElement, useState } from 'react';
import QRCode from 'react-qr-code';
import { Link } from 'react-router-dom';
import { TDownloadFunc } from '../../types/TDownloadFunc';
import { useDownloadFile } from '../hooks/useDownloadFile';

export const Distributor: React.FC = (): ReactElement => {
  const downloadFile: TDownloadFunc = useDownloadFile();

  const newDownload = () => {
    
  }

  const template: string = "match,red1,scout,red2,scout,red3,scout,blue1,scout,blue2,scout,blue3,scout";

  return (
    <Box sx={{ height: '100%', width: '100%', alignContent: 'center', alignItems: 'center' }}>
      <Typography variant="h4">Scouting Center</Typography>
      <Button>Import CSV</Button>
      <Button onClick={(): void => downloadFile(template, "eventName.csv")}>
        Download Template
      </Button>
      <Button>Export Data</Button>
      <Button component={Link} to="/Capturer">
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
