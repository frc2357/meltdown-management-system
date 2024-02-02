import { Box, Button, ButtonGroup } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import { TDownloadFunc } from '../../types/TDownloadFunc';
import { useDownloadFile } from '../hooks/useDownloadFile';
import QRCode from 'react-qr-code';

export const Distributor: React.FC = (): ReactElement => {
  const defaultStringTabletAssignments: string | null = localStorage.getItem('tabletAssignments');
  let defaultTabletAssignments: string[] | null = null;
  if (defaultStringTabletAssignments) {
    defaultTabletAssignments = JSON.parse(defaultStringTabletAssignments);
  }

  const downloadFile: TDownloadFunc = useDownloadFile();
  const [tabletAssignments, setTabletAssignments] = useState<string[] | null>(
    defaultTabletAssignments
  );
  const [assignmentIndex, setAssignmentIndex] = useState(0);

  const template: string =
    'match,red1,scout,red2,scout,red3,scout,blue1,scout,blue2,scout,blue3,scout';

  const alliances: string[] = ['RED 1', 'RED 2', 'RED 3', 'BLUE 1', 'BLUE 2', 'BLUE 3'];

  const qrShow = () => {
    if (!tabletAssignments) {
      return <Typography>No CSV Loaded</Typography>;
    }

    const qrCodes: any[] = [];

    for (let i = 0; i < 6; i++) {
      qrCodes.push(
        <QRCode
          key={i}
          value={tabletAssignments[i]}
          size={500}
          style={{
            position: 'absolute',
            display: assignmentIndex === i ? 'inline' : 'none',
          }}
        />
      );
    }

    return qrCodes;
  };

  const onImportCSV: () => void = (): void => {
    //@ts-ignore
    window.api.openAssignment().then((zippedAssignments: string[]): void => {
      localStorage.setItem('tabletAssignments', JSON.stringify(zippedAssignments));
      setTabletAssignments(zippedAssignments);
    });
  };

  return (
    <Box sx={{ height: '100%', width: '100%', alignContent: 'center', alignItems: 'center' }}>
      <Typography variant="h4">Scouting Center</Typography>
      <Button variant="contained" onClick={onImportCSV}>
        Import CSV
      </Button>
      <Button variant="contained" onClick={(): void => downloadFile('eventName.csv', template)}>
        Download template
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          //@ts-ignore
          window.api.exportMatches();
        }}
      >
        Export Data
      </Button>
      <Button variant="contained" component={Link} to="/Capturer">
        Capturer
      </Button>
      {tabletAssignments === null ? (
        <Typography>No CSV Loaded</Typography>
      ) : (
        <Box>
          <Typography>{alliances[assignmentIndex]}</Typography>
          <Box
            sx={{
              alignItems: 'center',
              background: 'white',
              padding: '16px',
              height: '500px',
              width: '500px',
            }}
          >
            {qrShow()}
          </Box>
          <ButtonGroup variant="outlined">
            <Button
              onClick={() => {
                let newIndex = assignmentIndex - 1;
                if (newIndex < 0) newIndex = 5;
                setAssignmentIndex(newIndex);
              }}
            >
              Prev
            </Button>
            <Button
              onClick={() => {
                let newIndex = assignmentIndex + 1;
                if (newIndex > 5) newIndex = 0;
                setAssignmentIndex(newIndex);
              }}
            >
              Next
            </Button>
          </ButtonGroup>
        </Box>
      )}
    </Box>
  );
};
