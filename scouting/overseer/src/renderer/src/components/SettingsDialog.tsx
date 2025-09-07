import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Stack,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { LoadingGear } from './LoadingGear';
import { TSettings } from '../../../types/TSettings';

export type PCreateTemplate = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function SettingsDialog({ open, setOpen }: PCreateTemplate): React.JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [settings, setSettings] = useState<TSettings | null>();

  useEffect(() => {
    window.api.getSettings().then((settings: TSettings) => setSettings(settings));
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const saveSettings = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const name = formJson.bucketName as string;

    console.log(name);

    const settings = {
      accessKeyId: formJson.accessKeyId,
      bucketName: formJson.bucketName,
      secretAccessKey: formJson.secretAccessKey,
    } as TSettings;

    setLoading(true);

    const onSuccess = () => {
      setLoading(false);
      setOpen(false);
    };

    window.api.saveSettings({ settings }).then(onSuccess);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: saveSettings,
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
              id="bucketName"
              name="bucketName"
              label="S3 Bucket Name"
              type="text"
              fullWidth
              variant="filled"
              defaultValue={settings?.bucketName ?? ''}
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
              defaultValue={settings?.accessKeyId ?? ''}
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
              defaultValue={settings?.secretAccessKey ?? ''}
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
