import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import { QrScanner } from '@yudiel/react-qr-scanner';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

export function Capturer(): ReactElement {
  const [isProcessing, setProcessing] = useState<boolean>(false);
  const [isAlertOpen, setAlertOpen] = useState<boolean>(false);
  const [goodScan, setGoodScan] = useState<boolean>(false);
  const [camera, setCamera] = useState<string>('default');
  const [allCameras, setAllCameras] = useState<MediaDeviceInfo[]>([]);

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

  const handleCameraSelect: (event: SelectChangeEvent) => void = (event: SelectChangeEvent) => {
    setCamera(event.target.value as string);
  };

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const cameras = devices.filter((device) => {
        return device.kind === 'videoinput';
      });
      setAllCameras(cameras);
    });
  }, []);

  const memoizedQrScanner = useMemo(() => {
    return (
      <Box width={500}>
        <QrScanner
          stopDecoding={isAlertOpen && !isProcessing} // Prevent decoding when alert is open and not processing
          onDecode={handleScan}
          onError={handleError}
          deviceId={camera === 'default' ? undefined : camera}
          audio={false}
        />
      </Box>
    );
  }, [isAlertOpen, isProcessing, camera]);

  return (
    <Box
      sx={{
        marginLeft: '16px',
        height: '100%',
        width: '100%',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack direction="row">
        {memoizedQrScanner}
        <Stack direction="column" spacing={2} sx={{ marginLeft: '16px' }}>
          <InputLabel id="camera-select-label">Camera:</InputLabel>
          <Select
            labelId="camera-select-label"
            value={camera}
            onChange={handleCameraSelect}
            autoWidth={false}
            sx={{ width: '200px' }}
          >
            <MenuItem value="default">Default</MenuItem>
            {allCameras.map((camera) => (
              <MenuItem key={camera.deviceId} value={camera.deviceId}>
                {camera.label || 'Unnamed Camera'}
              </MenuItem>
            ))}
          </Select>
          <Button variant="contained" component={Link} to="/management/distributor">
            Distributor
          </Button>
        </Stack>
      </Stack>
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
