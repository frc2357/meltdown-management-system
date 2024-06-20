import { Box } from '@mui/material';
import React, { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ExampleTitle } from './components/ExampleTitle';

export const App: React.FC = (): ReactElement => {
  return (
    <Box
      sx={{
        minHeight: 600,
        minWidth: 600,
      }}
    >
      <Routes>
        <Route path="/" element={<ExampleTitle />} />
      </Routes>
    </Box>
  );
};
