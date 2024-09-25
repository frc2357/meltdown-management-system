import {
  AppBar,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Stack,
  SxProps,
  Toolbar,
  Typography,
  styled,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const cardStyle: SxProps = {
  height: 250,
  width: 250,
};

export function TemplateDashboard(): ReactElement {
  const location = useLocation();
  const rawTitle: string = location.pathname.split('/').pop() ?? '';
  const title: string = rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1);
  // const templateIds: string[]  =

  return (
    <>
      <AppBar sx={{ width: '100%' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            component={Link}
            to="/"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Overseer: {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Offset />
      <Stack direction="row" spacing={2} sx={{ margin: 10 }}>
        <Card sx={cardStyle}>
          <CardActionArea
            component={Link}
            to="/template/temp"
            sx={{ height: '100%', width: '100%', alignContent: 'center' }}
          >
            <CardContent>
              <Stack direction="column" sx={{ alignContent: 'center', alignItems: 'center' }}>
                <AddCircleOutlineIcon />
                <Typography sx={{ textAlign: 'center' }}>Add Template</Typography>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      </Stack>
    </>
  );
}
