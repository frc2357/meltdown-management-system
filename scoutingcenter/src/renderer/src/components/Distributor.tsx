import { Box, Button, ButtonGroup } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { ReactElement, useState } from 'react';
import QRCode from 'react-qr-code';
import { Link } from 'react-router-dom';
import { TDownloadFunc } from '../../types/TDownloadFunc';
import { useDownloadFile } from '../hooks/useDownloadFile';

export const Distributor: React.FC = (): ReactElement => {
  const downloadFile: TDownloadFunc = useDownloadFile();
  const [tabletAssignments, setTabletAssignments] = useState<string[]|null>(null);
  const [assignmentIndex, setAssignmentIndex] = useState(0);

  const template: string =
    'match,red1,scout,red2,scout,red3,scout,blue1,scout,blue2,scout,blue3,scout';

  const qrShow = () => {
    if(!tabletAssignments) {
      return (<Typography>No CSV Loaded</Typography>)
    }

    const qrCodes = [];


    for(let i = 0; i < 6; i++) {
      qrCodes.push(<QRCode value={tabletAssignments[i]} size={500} style={{
        position: 'absolute',
        display: assignmentIndex === i ? 'inline' : 'none'
      }}/>)
    }

    return qrCodes
  }

  const onImportCSV = () => {
    // @ts-ignore
    window.api.openAssignment().then((zippedAssignments: string[]): void => {
      console.log(zippedAssignments);
      setTabletAssignments(zippedAssignments)
    })
  }

  return (
    <Box sx={{ height: '100%', width: '100%', alignContent: 'center', alignItems: 'center' }}>
      <Typography variant="h4">Scouting Center</Typography>
      <Button variant="contained" onClick={onImportCSV}>Import CSV</Button>
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
      { tabletAssignments === null ? <Typography>No CSV Loaded</Typography> : 
      <Box>
      <Box sx={{ alignItems: 'center', background: 'white', padding: '16px', height: '500px', width: '500px' }}>
        {qrShow()}
      </Box>
      <ButtonGroup variant="outlined">
        <Button onClick={() => {
          let newIndex = assignmentIndex - 1;
          if(newIndex < 0) newIndex = 5;
          setAssignmentIndex(newIndex)
        }}>Prev</Button>
        <Button onClick={() => {
          let newIndex = assignmentIndex + 1;
          if(newIndex > 5) newIndex = 0;
          setAssignmentIndex(newIndex)
        }}>Next</Button>
      </ButtonGroup></Box>}
    </Box>
  );
};
