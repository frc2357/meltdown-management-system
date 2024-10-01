import { CardActionArea, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { AppCard } from '../AppCard';
import React, { useContext, useState } from 'react';
import { TemplatesContext } from '../../context/TemplatesContext';
import { CreateTemplateDialog } from './CreateTemplateDialog';

export type PTemplateCard = {
  template: string;
};

export function TemplateCard({ template }: PTemplateCard): React.JSX.Element {
  const [templates, setTemplates] = useContext(TemplatesContext);
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);

  const deleteTemplate = () => {
    window.api.deleteTemplate({ name: template });
    setTemplates([...templates.filter((elem) => elem !== template)]);
  };

  return (
    <>
      <AppCard>
        <CardActionArea
          component={Link}
          to={template}
          sx={{ height: '80%', width: '100%', alignContent: 'center' }}
        >
          <CardContent sx={{ alignContent: 'center' }}>
            <Typography sx={{ textAlign: 'center' }}>{template}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <IconButton sx={{ marginLeft: 'auto' }} onClick={() => setOpenCreateDialog(true)}>
            <ContentCopyIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon sx={{ color: 'red' }} onClick={() => deleteTemplate()} />
          </IconButton>
        </CardActions>
      </AppCard>
      <CreateTemplateDialog
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
        copy={true}
        oldName={template}
      />
    </>
  );
}
