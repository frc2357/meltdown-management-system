import React from 'react';
import {
  AppBar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  SxProps,
  Toolbar,
  Typography,
  styled,
} from '@mui/material';
import { Link } from 'react-router-dom';

const cardStyle: SxProps = {
  height: 250,
  width: 250,
};

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export function AppDashboard() {
  return (
    <Box>
      <AppBar sx={{ width: '100%' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Meltdown Management System: Scouting
          </Typography>
        </Toolbar>
      </AppBar>
      <Offset />
      <Stack direction="row" spacing={2} sx={{ margin: 10 }}>
        <Card sx={cardStyle}>
          <CardActionArea
            component={Link}
            to="/management/distributor"
            sx={{ height: '100%', width: '100%', alignContent: 'center' }}
          >
            <CardContent>
              <Typography sx={{ textAlign: 'center' }}>Management System</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={cardStyle}>
          <CardActionArea
            component={Link}
            to="/template/dashboard"
            sx={{ height: '100%', width: '100%', alignContent: 'center' }}
          >
            <CardContent>
              <Typography sx={{ textAlign: 'center' }}>Template Builder</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Stack>
    </Box>
  );
}
