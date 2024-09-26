import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import React, { useState } from 'react';
import { LoadingGear } from './LoadingGear';
import { useNavigate } from 'react-router-dom';

export type PCreateTemplate = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function CreateTemplate({ open, setOpen }: PCreateTemplate): React.JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const createTemplate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const name = formJson.name;
    console.log(name);

    setLoading(true);
    window.api.createTemplate({ name }).then((success: boolean) => {
      setLoading(false);

      if (success) {
        navigate(`${name}`);
      }
    });
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
        <DialogTitle>Create New Template</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Template Name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant={'outlined'}>
            Cancel
          </Button>
          <Button type="submit" variant={'contained'}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <LoadingGear loading={loading} />
    </>
  );
}
