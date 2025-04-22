import React, { useEffect, useRef } from 'react';
import { outputStructure } from './2025';
import Papa from 'papaparse';
import {
  Box,
  Skeleton,
  Stack,
  AppBar,
  Typography,
  Select,
  Toolbar,
  MenuItem,
  SelectChangeEvent,
  Grid,
} from '@mui/material';
import logo from './assets/logo.png';
import BarCard from './components/BarCard';

function App() {
  const data: any = useRef<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [teams, setTeams] = React.useState<string[]>([]);
  const [selectedTeam, setSelectedTeam] = React.useState<string>('none');

  function compute(rawData: any[]) {
    const byTeam: any = rawData.reduce((acc: any, row: any) => {
      const key = row['team-match'];
      const team = key.split('-')[0];
      if (!acc[team]) {
        acc[team] = [];
      }
      acc[team].push(row);
      return acc;
    }, {});

    console.log(Object.keys(byTeam));
    data.current = byTeam;
    setTeams(Object.keys(byTeam));
    setIsLoading(false);
  }

  useEffect(() => {
    fetch(`https://mms-prod-scouting-output.s3.us-east-2.amazonaws.com/${outputStructure.fileName}`)
      .then((response) => {
        return response.text();
      })
      .then((text: string) => {
        const parsedData = Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
        });
        compute(parsedData.data);
      });
  }, []);

  const handleSelectTeam = (event: SelectChangeEvent<string>) => {
    setSelectedTeam(event.target.value);
  };

  return (
    <Box>
      {isLoading ? (
        <Stack spacing={2} direction="column">
          <Skeleton variant="text" sx={{ fontSize: '5rem' }} />
          <Stack spacing={1} direction="row">
            <Skeleton variant="rounded" width={'40%'} height={200} />
            <Skeleton variant="rounded" width={'60%'} height={200} />
          </Stack>
          <Stack spacing={1} direction="row">
            <Skeleton variant="rounded" width={'60%'} height={200} />
            <Skeleton variant="rounded" width={'40%'} height={200} />
          </Stack>
        </Stack>
      ) : (
        <Box>
          <AppBar position="sticky" sx={{ marginBottom: 2 }}>
            <Toolbar>
              <Typography variant="h6" sx={{ margin: 2 }}>
                {outputStructure.event}
              </Typography>
              <Select
                sx={{ margin: 'auto', width: 100 }}
                variant="outlined"
                value={selectedTeam}
                onChange={handleSelectTeam}
              >
                <MenuItem key="none" value="none">
                  None
                </MenuItem>
                {teams.map((team) => (
                  <MenuItem key={team} value={team}>
                    {team}
                  </MenuItem>
                ))}
              </Select>
              <img style={{ height: 40, width: 40, marginLeft: 'auto' }} src={logo} alt="logo" />
            </Toolbar>
          </AppBar>
          <Grid
            columnSpacing={2}
            rowSpacing={2}
            container
            sx={{ margin: 1 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Grid size={{ sm: 12, md: 6 }}>
              <BarCard />
            </Grid>
            <Grid size={{ sm: 12, md: 6 }}>
              <BarCard />
            </Grid>
            <Grid size={{ sm: 12, md: 6 }}>
              <BarCard />
            </Grid>
            <Grid size={{ sm: 12, md: 6 }}>
              <BarCard />
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default App;
