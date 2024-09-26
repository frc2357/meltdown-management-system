import {
  AppBar,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Stack,
  SxProps,
  Toolbar,
  Typography,
  styled,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { ReactElement, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CreateTemplate } from '../components/CreateTemplate';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const cardStyle: SxProps = {
  height: 250,
  width: 250,
};

export function TemplateDashboard(): ReactElement {
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const [templates, setTemplates] = useState<string[]>([]);

  const location = useLocation();

  useEffect(() => {
    window.api.getTemplates().then((templates: string[]) => {
      setTemplates(templates);
    })
  }, [])

  const rawTitle: string = location.pathname.split('/').pop() ?? '';
  const title: string = rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1);

  const templateCards: React.JSX.Element[] = []

  templates.forEach((template: string) => {
    templateCards.push(
      <Card sx={cardStyle}>
            <CardActionArea
              component={Link}
              to={template}
              sx={{ height: '100%', width: '100%', alignContent: 'center' }}
            >
              <CardContent>
                <Typography sx={{ textAlign: 'center' }}>{template}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
    )
  })

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
      <Stack direction="row" spacing={2} sx={{ margin: 10 }}>
        <Card sx={cardStyle}>
          <CardActionArea
            onClick={() => setOpenCreateDialog(true)}
            sx={{ height: '100%', width: '100%', alignContent: 'center' }}
          >
            <CardContent>
              <Stack direction="column" sx={{ alignContent: 'center', alignItems: 'center' }}>
                <AddCircleOutlineIcon />
                <Typography sx={{ textAlign: 'center' }}>Add Template</Typography>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
        {templateCards}
      </Stack>
      <CreateTemplate open={openCreateDialog} setOpen={setOpenCreateDialog} existingTemplates={templates} />
    </>
  );
}
