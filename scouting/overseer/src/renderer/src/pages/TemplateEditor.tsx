import { IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function TemplateEditor() {
  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        component={Link}
        to="/template"
      >
        <ArrowBackIcon />
      </IconButton>

      <Typography variant="h1">I AM A TEMPLATE</Typography>
    </>
  );
}
