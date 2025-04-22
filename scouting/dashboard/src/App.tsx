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
        <Box>
          <Skeleton variant="text" sx={{ fontSize: '5rem' }} />
          <Grid
            columnSpacing={2}
            rowSpacing={2}
            container
            sx={{ margin: 1 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Skeleton variant="rounded" sx={{ fontSize: '5rem' }} />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Skeleton variant="rounded" sx={{ fontSize: '5rem' }} />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Skeleton variant="rounded" sx={{ fontSize: '5rem' }} />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Skeleton variant="rounded" sx={{ fontSize: '5rem' }} />
            </Grid>
          </Grid>
        </Box>
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
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <BarCard />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <BarCard />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <BarCard />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <BarCard />
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default App;
