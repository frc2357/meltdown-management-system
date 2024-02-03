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

export const Capturer: React.FC = (): ReactElement => {
  const [isProcessing, setProcessing] = useState<boolean>(false);
  const [isAlertOpen, setAlertOpen] = useState<boolean>(false);
  const [goodScan, setGoodScan] = useState<boolean>(false);

  const handleScan: (data: string) => void = (data: string): void => {
    setProcessing(true);
    setAlertOpen(true);
    console.log(data);
    // @ts-ignore
    window.api.handleScan(data).then((success: boolean) => {
      setProcessing(false);
      setGoodScan(success);
    });
  };

  const handleError: (err: any) => void = (err: any): void => {
    console.error(err);
  };

  const handleClose: () => void = (): void => {
    if (isProcessing) return;
    setAlertOpen(false);
  };

  return (
    <Box sx={{ marginLeft: '16px' }}>
      <QrScanner stopDecoding={isAlertOpen} onDecode={handleScan} onError={handleError} />
      <Button sx={{ marginTop: '10px' }} variant="contained" component={Link} to="/">
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
};
