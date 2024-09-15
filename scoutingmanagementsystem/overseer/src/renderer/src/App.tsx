import { Box } from '@mui/material';
import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Capturer } from './pages/Capturer';
import { Distributor } from './pages/Distributor';
import { AppDashboard } from './pages/AppDashboard';

const router = createHashRouter([
  {
    path: '/',
    element: <AppDashboard />,
    errorElement: <></>,
  },
  {
    path: '/management/distributor',
    element: <Distributor />,
    errorElement: <></>,
  },
  {
    path: '/management/capturer',
    element: <Capturer />,
    errorElement: <></>,
  },
]);

export function App() {
  return (
    <Box
      sx={{
        minHeight: 600,
        minWidth: 600,
        flexGrow: 1,
      }}
    >
      <RouterProvider router={router}></RouterProvider>
    </Box>
  );
}
