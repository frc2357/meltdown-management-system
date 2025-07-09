import { Box, Button, ButtonGroup, Skeleton, Stack, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import { TDownloadFunc } from '../../../types/TDownloadFunc';
import { useDownloadFile } from '../hooks/useDownloadFile';
import QRCode from 'react-qr-code';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export function Distributor(): ReactElement {
  const defaultStringTabletAssignments: string | null = sessionStorage.getItem('tabletAssignments');
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

  const qrShow = (tabletAssignments: string[]) => {
    const qrCodes: ReactElement[] = [];

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
    window.api.openAssignment().then((zippedAssignments: string | null): void => {
      if (zippedAssignments == null) {
        return;
      }
      sessionStorage.setItem('tabletAssignments', zippedAssignments);
      setTabletAssignments(JSON.parse(zippedAssignments));
    });
  };

  const AllianceQrSkeleton = () => {
    return (
      <Tooltip title="Import CSV to Get Started" followCursor>
        <Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6">
              <Skeleton variant="text" width={200} sx={{ mx: 'auto' }} />
            </Typography>
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              marginTop: '16px',
              marginBottom: '16px',
              height: '500px',
              width: '500px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Skeleton variant="rectangular" width={500} height={500} />
          </Box>
          <ButtonGroup variant="outlined" sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button startIcon={<ArrowBackIcon />} disabled>
              Prev
            </Button>
            <Button endIcon={<ArrowForwardIcon />} disabled>
              Next
            </Button>
          </ButtonGroup>
        </Box>
      </Tooltip>
    );
  };

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
      <Stack direction="row">
        {tabletAssignments === null ? (
          <AllianceQrSkeleton />
        ) : (
          <Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography sx={{ color: assignmentIndex / 2 > 1 ? 'blue' : 'red' }} variant="h6">
                {alliances[assignmentIndex]}
              </Typography>
            </Box>
            <Box
              sx={{
                alignItems: 'center',
                marginTop: '16px',
                marginBottom: '16px',
                height: '500px',
                width: '500px',
              }}
            >
              {qrShow(tabletAssignments)}
            </Box>
            <ButtonGroup variant="outlined" sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                onClick={(): void => {
                  let newIndex: number = assignmentIndex - 1;
                  if (newIndex < 0) newIndex = 5;
                  setAssignmentIndex(newIndex);
                }}
                startIcon={<ArrowBackIcon />}
              >
                Prev
              </Button>
              <Button
                onClick={(): void => {
                  let newIndex: number = assignmentIndex + 1;
                  if (newIndex > 5) newIndex = 0;
                  setAssignmentIndex(newIndex);
                }}
                endIcon={<ArrowForwardIcon />}
              >
                Next
              </Button>
            </ButtonGroup>
          </Box>
        )}
        <Stack direction="column" spacing={2} sx={{ margin: 1, paddingTop: 5, marginLeft: '16px' }}>
          <Button variant="contained" onClick={onImportCSV}>
            Import CSV
          </Button>
          <Button variant="contained" onClick={(): void => downloadFile('eventName.csv', template)}>
            Download template
          </Button>
          {tabletAssignments !== null && (
            <>
              <Button
                variant="contained"
                onClick={(): void => {
                  window.api.exportMatches();
                }}
              >
                Export Data
              </Button>
              <Button variant="contained" component={Link} to="/management/capturer">
                Capturer
              </Button>
            </>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
