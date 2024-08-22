import { Box, Button, Card, Divider, IconButton, Paper, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { ReactElement } from 'react';
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbarQuickFilter,
  GridToolbar,
} from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

const margin = '4px';

const inventoryRows: GridRowsProp = [
  { id: 1, item: 'screw', status: '2474', location: 'null', condition: 'Okay' },
  { id: 2, item: 'nut', status: 'null', location: 'null', condition: 'Okay' },
  { id: 3, item: 'bolt', status: '3255', location: 'null', condition: 'Okay' },
  { id: 4, item: 'cell', status: '6436', location: '(816)-905-8331', condition: 'Okay' },
  { id: 5, item: 'cell', status: 'null', location: 'null', condition: 'Okay' },
  { id: 6, item: 'cell ', status: '2474', location: 'null', condition: 'Okay' },
];

const inventoryColumns: GridColDef[] = [
  { field: 'item', headerName: 'Item', width: 200 },
  { field: 'location', headerName: 'Location', width: 200 },
  { field: 'status', headerName: 'Status', width: 200 },
  { field: 'condition', headerName: 'Condition', width: 200 },
];

export const Inventory: React.FC = (): ReactElement => {
  return (
    <Box
      position="absolute"
      sx={{
        left: '80px',
        top: '80px',
        width: `calc(100% - 100px)`,
        height: `calc(100% - 200px)`,
      }}
    >
      <Stack sx={{ height: '100%' }} spacing={1}>
        <Typography variant="h4">Inventory</Typography>
        <Stack justifyContent="flex-end" direction="row" spacing={2.5}>
          <Button variant="contained" color="primary" size="large">
            IMPORT
          </Button>
          <Button variant="contained" color="primary" size="large">
            DOWNLOAD TEMPLATE
          </Button>
          <Button variant="contained" color="primary" size="large">
            EXPORT
          </Button>
        </Stack>
        <Divider />
        <Stack direction="row" spacing={0.5} sx={{ height: '100%' }}>
          <Divider flexItem />
          <Box sx={{ width: '100%', height: '100%' }}>
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
                  height: '100%',
                }}
              >
                <Stack
                  sx={{
                    height: '100%',
                  }}
                >
                  <Divider />
                  <DataGrid
                    initialState={{ pagination: { paginationModel: { pageSize: 100 } } }}
                    pageSizeOptions={[100]}
                    disableRowSelectionOnClick
                    rows={inventoryRows}
                    columns={inventoryColumns}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                      toolbar: {
                        showQuickFilter: true,
                      },
                    }}
                  />
                </Stack>
              </Card>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};
