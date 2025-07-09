import { Box, CssBaseline } from '@mui/material';
import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Capturer } from './pages/Capturer';
import { Distributor } from './pages/Distributor';
import { AppDashboard } from './pages/AppDashboard';
import { Management } from './pages/Management';
import { TemplateDashboard } from './pages/TemplateDashboard';
import { TemplateEditor } from './pages/TemplateEditor';
import { ThemeProvider } from '@emotion/react';
import { appTheme } from './theme/appTheme';
import { ErrorPage } from './pages/ErrorPage';

const router = createHashRouter([
  {
    path: '/',
    element: <AppDashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/management',
    element: <Management />,
    errorElement: <ErrorPage />,
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
    errorElement: <ErrorPage />,
  },
  {
    path: '/template/:templateId',
    element: <TemplateEditor />,
    errorElement: <ErrorPage />,
  },
]);

export function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme />
      <Box
        sx={{
          minHeight: 600,
          minWidth: 600,
          flexGrow: 1,
        }}
      >
        <RouterProvider router={router}></RouterProvider>
      </Box>
    </ThemeProvider>
  );
}
