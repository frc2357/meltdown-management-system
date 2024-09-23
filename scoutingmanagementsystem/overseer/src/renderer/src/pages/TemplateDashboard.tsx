import { AppBar, IconButton, Toolbar, Typography, styled } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export function TemplateDashboard(): ReactElement {
  const location = useLocation();
  const rawTitle: string = location.pathname.split('/').pop() ?? '';
  const title: string = rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1);

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
    </>
  );
}
