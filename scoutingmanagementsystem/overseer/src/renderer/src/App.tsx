import { Box } from '@mui/material';
import React, { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Capturer } from './components/Capturer';
import { Distributor } from './components/Distributor';

export default function Dashboard() {
  return (
    <Box
      sx={{
        minHeight: 600,
        minWidth: 600,
      }}
    >
      <Routes>
        <Route path="/" element={<Distributor />} />
        <Route path="/capturer" element={<Capturer />} />
      </Routes>
    </Box>
  );
};
