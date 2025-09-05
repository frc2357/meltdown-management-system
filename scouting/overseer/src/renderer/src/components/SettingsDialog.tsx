import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Stack,
} from '@mui/material';
import React, { useState } from 'react';
import { LoadingGear } from './LoadingGear';

export type PCreateTemplate = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function SettingsDialog({ open, setOpen }: PCreateTemplate): React.JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  const createTemplate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const name = formJson.name as string;

    console.log(name);

    setLoading(true);

    const onSuccess = (success: boolean) => {
      setLoading(false);
      setOpen(false);
    };

    //window.api.createTemplate({ name }).then(onSuccess);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: createTemplate,
        }}
        fullWidth
      >
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <Stack direction={'column'} spacing={3}>
            <TextField
              autoFocus={true}
              required
              margin="dense"
              id="bucket"
              name="bucket"
              label="S3 Bucket Name"
              type="text"
              fullWidth
              variant="filled"
            />
            <TextField
              autoFocus={true}
              required
              margin="dense"
              id="accessKeyId"
              name="accessKeyId"
              label="Access Key ID"
              type="password"
              fullWidth
              variant="filled"
            />
            <TextField
              autoFocus={true}
              required
              margin="dense"
              id="secretAccessKey"
              name="secretAccessKey"
              label="Secret Access Key"
              type="password"
              fullWidth
              variant="filled"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant={'outlined'}>
            Cancel
          </Button>
          <Button type="submit" variant={'contained'}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <LoadingGear loading={loading} />
    </>
  );
}
