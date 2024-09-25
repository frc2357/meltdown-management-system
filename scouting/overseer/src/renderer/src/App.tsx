import { Box } from '@mui/material';
import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Capturer } from './pages/Capturer';
import { Distributor } from './pages/Distributor';
import { AppDashboard } from './pages/AppDashboard';
import { Management } from './pages/Management';
import { TemplateDashboard } from './pages/TemplateDashboard';
import { TemplateEditor } from './pages/TemplateEditor';

const router = createHashRouter([
  {
    path: '/',
    element: <AppDashboard />,
    errorElement: <></>,
  },
  {
    path: '/management',
    element: <Management />,
    errorElement: <></>,
    children: [
      {
        path: 'distributor',
        element: <Distributor />,
      },
      {
        path: 'capturer',
        element: <Capturer />,
      },
    ],
  },
  {
    path: '/template',
    element: <TemplateDashboard />,
    errorElement: <></>,
  },
  {
    path: '/template/:templateId',
    element: <TemplateEditor />,
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
