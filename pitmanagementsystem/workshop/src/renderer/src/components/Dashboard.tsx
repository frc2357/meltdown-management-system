import { Box, Card, Divider, Paper, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { ReactElement } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

const margin = '4px';

const loanerRows: GridRowsProp = [
  { id: 1, item: 'screw', team: '2474', phone: 'null'}, 
  { id: 2, item: 'nut', team: 'null', phone: 'null'}, 
  { id: 3, item: 'bolt', team: '3255', phone: 'null'}, 
  { id: 4, item: 'cell', team: '6436', phone: '(816)-905-8331'}, 
  { id: 5, item: 'cell', team: 'null', phone: 'null'}, 
  { id: 6, item: 'cell ', team: '2474', phone: 'null'}, 
];

const loanerColumns: GridColDef[] = [
  { field: 'item', headerName: 'Item', width: 200 },
  { field: 'team', headerName: 'Team #', width: 200 },
  { field: 'phone', headerName: 'Phone', width: 200 },
];


const batteryRows: GridRowsProp = [
    { id: 1, charge: 'no data', status: 'In Use', idnumber: '4'}, 
    { id: 2, charge: '78%', status: 'Charging', idnumber: '7'}, 
    { id: 3, charge: 'no data', status: 'Missing', idnumber: '8'}, 
    { id: 4, charge: 'no data', status: 'Loaned Out', idnumber: '9'},
    { id: 5, charge: '35%', status: 'Charging', idnumber: '12'}, 
    { id: 6, charge: '105%', status: 'Charging', idnumber: '16'}, 
    { id: 7, charge: '35%', status: 'Charging', idnumber: '12'}, 
    { id: 8, charge: '105%', status: 'Charging', idnumber: '16'},  
  ];
  
  const batteryColumns: GridColDef[] = [
    { field: 'status', headerName: 'Status', width: 200 },
    { field: 'charge', headerName: 'Charge %', width: 200 },
    { field: 'idnumber', headerName: 'ID #', width: 200 },
  ];





export const Dashboard: React.FC = (): ReactElement => {
  return (
    <Box
      position="absolute"
      sx={{
        left: '80px',
        top: '80px',
        width: `calc(100% - 100px)`,
        height: `calc(100% - 140px)`,
      }}
    >
      <Typography variant="h4">Dashboard</Typography>
      <Divider />
      <Stack direction="row" spacing={0.5} sx={{ height: '100%' }}>
        <Card sx={{ width: '50%', height: '100%' }} variant="outlined"> 
          <Typography marginLeft={margin}> Nexus Viewer Goes Here </Typography>
        </Card>
        <Divider flexItem />
        <Box sx={{ width: '50%', height: '100%' }}>
          <Stack
            spacing={0.25}
            sx={{
              width: '100%',
              height: '100%',
            }}
          >
            <Card
              sx={{
                width: '100%',
                height: '50%',
              }}
            >
              <Stack
                sx={{
                  height: '100%',
                }}
              >
                <Typography marginLeft={margin}> Loaner Program Summary </Typography>
                <Divider />
                <DataGrid
                  initialState={{ pagination: { paginationModel: { pageSize: 100 } } }}
                  pageSizeOptions={[100]}
                  disableRowSelectionOnClick
                  rows={loanerRows}
                  columns={loanerColumns}
                />
              </Stack>
            </Card>
            <Divider variant="middle" />
            <Card
              sx={{
                width: '100%',
                height: '50%',
              }}
            >
                            <Stack
                sx={{
                  height: '100%',
                }}
              >
                <Typography marginLeft={margin}> Battery Summary </Typography>
                <Divider />
                <DataGrid
                  initialState={{ pagination: { paginationModel: { pageSize: 100 } } }}
                  pageSizeOptions={[100]}
                  disableRowSelectionOnClick
                  rows={batteryRows}
                  columns={batteryColumns}
                />
              </Stack>
            </Card>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
