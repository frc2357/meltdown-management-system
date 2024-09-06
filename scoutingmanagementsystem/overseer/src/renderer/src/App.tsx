import { Box } from '@mui/material';
import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Capturer } from './components/Capturer';
import { Distributor } from './components/Distributor';

const router = createHashRouter([
  {
    path: '/',
    element: <></>,
    errorElement: <></>,
    children: [
      {
        path: "/capturer",
        element: <Capturer/>
      }, 
      {
        path: "/distributor",
        element: <Distributor/>
      }
    ]
  }
])

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
