import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { LoadingGear } from '../LoadingGear';
import { useNavigate } from 'react-router-dom';
import { TemplatesContext } from '../../context/TemplatesContext';

export type PCreateTemplate = {
  open: boolean;
  setOpen: (open: boolean) => void;
  copy?: boolean;
  oldName?: string;
};

export function CreateTemplateDialog({
  open,
  setOpen,
  copy,
  oldName,
}: PCreateTemplate): React.JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');
  const [templates] = useContext(TemplatesContext);

  const navigate = useNavigate();

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

    if (templates.includes(name)) {
      setError(true);
      setErrorText('Template already exists with the same name');
      setLoading(false);
      return;
    }

    const onSuccess = (success: boolean) => {
      setLoading(false);

      if (success) {
        navigate(`${name}`);
      }
    };

    if (copy) {
      window.api.copyTemplate({ oldName: oldName ?? '', newName: name }).then(onSuccess);
    } else {
      window.api.createTemplate({ name }).then(onSuccess);
    }
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
            autoFocus={true}
            required
            margin="dense"
            id="name"
            name="name"
            label="Template Name"
            type="text"
            fullWidth
            variant="standard"
            helperText={errorText}
            error={error}
            defaultValue={copy ? `${oldName}-copy` : ''}
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
