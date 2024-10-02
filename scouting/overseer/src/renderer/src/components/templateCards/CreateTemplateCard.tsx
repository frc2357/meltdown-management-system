import { CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import React, { useState } from 'react';
import { AppCard } from '../AppCard';
import { CreateTemplateDialog } from './CreateTemplateDialog';

export function CreateTemplateCard(): React.JSX.Element {
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);

  return (
    <>
      <AppCard>
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
      </AppCard>
      <CreateTemplateDialog open={openCreateDialog} setOpen={setOpenCreateDialog} />
    </>
  );
}
