import { AppBar, IconButton, Stack, Toolbar, Typography, styled } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { ReactElement, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CreateTemplateCard } from '../components/templateCards/CreateTemplateCard';
import { TemplatesContext } from '../context/TemplatesContext';
import { TemplateCard } from '../components/templateCards/TemplateCard';
import SettingsIcon from '@mui/icons-material/Settings';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export function TemplateDashboard(): ReactElement {
  const [templates, setTemplates] = useState<string[]>([]);

  const location = useLocation();

  useEffect(() => {
    window.api.getTemplates().then((templates: string[]) => {
      setTemplates(templates);
    });
  }, []);

  const rawTitle: string = location.pathname.split('/').pop() ?? '';
  const title: string = rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1);

  const templateCards: React.JSX.Element[] = [];

  templates.forEach((template: string) => {
    templateCards.push(<TemplateCard template={template} key={template} />);
  });

  return (
    <TemplatesContext.Provider value={[templates, setTemplates]}>
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
      <Stack direction="row" spacing={2} sx={{ margin: 10, flexWrap: 'wrap' }} useFlexGap>
        <CreateTemplateCard />
        {templateCards}
      </Stack>
    </TemplatesContext.Provider>
  );
}
