import { AppBar, IconButton, Toolbar, Tooltip, Typography, styled } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { ReactElement, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import { SettingsDialog } from '../components/SettingsDialog';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export function Management(): ReactElement {
  const location = useLocation();
  const [openSettingsDialog, setOpenSettingsDialog] = useState<boolean>(false);
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
          <Tooltip title="Open Settings">
            <IconButton
              size="large"
              aria-label="settings"
              onClick={() => setOpenSettingsDialog(true)}
              color="inherit"
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <SettingsDialog open={openSettingsDialog} setOpen={setOpenSettingsDialog} />
      <Offset />
      <Outlet />
    </>
  );
}
