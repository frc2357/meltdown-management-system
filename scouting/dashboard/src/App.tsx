import React, { useEffect, useRef } from 'react';
import { outputStructure } from './2025';
import Papa from 'papaparse';
import {
  Box,
  Skeleton,
  AppBar,
  Typography,
  Select,
  Toolbar,
  MenuItem,
  SelectChangeEvent,
  Grid,
} from '@mui/material';
import logo from './assets/logo.png';
import { BarCard, TBarCardProps } from './components/BarCard';
import { LoadingGridWrapper } from './components/LoadingGridWrapper';

function App() {
  const fullData: any = useRef<any>(null);
  const teamData: any = useRef<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [teams, setTeams] = React.useState<string[]>([]);
  const [selectedTeam, setSelectedTeam] = React.useState<string>('none');

  function buildChartData(teamData: any): TBarCardProps[] {
    const allChartData: TBarCardProps[] = [];
    for (const chart of outputStructure.charts) {
      const chartData = {
        title: chart.title,
        dataset: [],
      };
      chartData.dataset = teamData.reduce((acc: { label: string; value: number }[], row: any) => {
        for (const keySet of chart.aggregateKeys) {
          let value: number = 0;
          if (chart.type === 'number') {
            value = keySet.keys.reduce((sum: number, k: string) => {
              return sum + (row[k] ? parseInt(row[k], 10) : 0);
            }, 0);
          } else if (chart.type === 'enum') {
            value = keySet.keys.reduce((sum: number, k: string) => {
              return sum + (row[k] === keySet.label ? 1 : 0);
            }, 0);
          }
          const elem = acc.find((item) => item.label === keySet.label);
          if (elem) {
            elem.value += value;
          } else {
            acc.push({ label: keySet.label, value });
          }
        }
        return acc;
      }, []);
      allChartData.push(chartData);
    }

    return allChartData;
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
        const rawData = parsedData.data
        const byTeam: any = rawData.reduce((acc: any, row: any) => {
          const key = row['team-match'];
          const team = key.split('-')[0];
          if (!acc[team]) {
            acc[team] = [];
          }
          acc[team].push(row);
          return acc;
        }, {});
    
        fullData.current = byTeam;
        console.log(byTeam);
        setTeams(Object.keys(byTeam));
        setIsLoading(false);
        setSelectedTeam(Object.keys(byTeam)[0]);
        teamData.current = buildChartData(byTeam[Object.keys(byTeam)[0]]);
        });
  }, []);

  const handleSelectTeam = (event: SelectChangeEvent<string>) => {
    setSelectedTeam(event.target.value);
    teamData.current = buildChartData(fullData.current[event.target.value]);
  };

  return (
    <Box>
      {isLoading ? (
        <Skeleton variant="text" sx={{ fontSize: '5rem' }} />
      ) : (
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
              {teams.map((team) => (
                <MenuItem key={team} value={team}>
                  {team}
                </MenuItem>
              ))}
            </Select>
            <img style={{ height: 40, width: 40, marginLeft: 'auto' }} src={logo} alt="logo" />
          </Toolbar>
        </AppBar>
      )}
      <LoadingGridWrapper
        isLoading={selectedTeam === 'none'}
        numCharts={outputStructure.charts.length}
      >
        <Grid
          columnSpacing={2}
          rowSpacing={2}
          container
          sx={{ margin: 1 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {teamData.current?.map((data: any, i: number) => (
            <Grid size={{ xs: 12, sm: 12, md: 6 }} key={i}>
              <BarCard title={data.title} dataset={data.dataset} />
            </Grid>
          ))}
        </Grid>
      </LoadingGridWrapper>
    </Box>
  );
}

export default App;
