import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
} from '@mui/material';
import { QrScanner } from '@yudiel/react-qr-scanner';
import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

export function Capturer(): ReactElement {
  const [isProcessing, setProcessing] = useState<boolean>(false);
  const [isAlertOpen, setAlertOpen] = useState<boolean>(false);
  const [goodScan, setGoodScan] = useState<boolean>(false);

  const handleScan: (data: string) => void = (data: string): void => {
    setProcessing(true);
    setAlertOpen(true);
    window.api.handleScan({ b64: data }).then((success: boolean) => {
      setProcessing(false);
      setGoodScan(success);
    });
  };

  const handleError: (err: Error) => void = (err: Error): void => {
    console.error(err);
  };

  const handleClose: () => void = (): void => {
    if (isProcessing) return;
    setAlertOpen(false);
  };

  return (
    <Box sx={{ marginLeft: '16px' }}>
      <QrScanner stopDecoding={isAlertOpen} onDecode={handleScan} onError={handleError} />
      <Button
        sx={{ marginTop: '10px' }}
        variant="contained"
        component={Link}
        to="/management/distributor"
      >
        Distributor
      </Button>
      <Dialog
        open={isAlertOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Saving File'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {isProcessing ? 'Saving...' : goodScan ? 'Save Successful' : 'Save Failed'}
          </DialogContentText>
          {isProcessing && <LinearProgress />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
