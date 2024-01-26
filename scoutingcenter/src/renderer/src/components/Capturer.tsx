import { Box, Button } from '@mui/material';
import { QrScanner } from '@yudiel/react-qr-scanner';
import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

export const Capturer: React.FC = (): ReactElement => {
  const [result, setResult] = useState('');
  const [test, setTest] = useState(false);

  const handleScan: (data: any) => void = (data: any): void => {
    console.log(data);
    setResult(data);
  };

  const handleError: (err: any) => void = (err: any): void => {
    console.error(err);
  };

  return (
    <Box>
      <QrScanner onDecode={handleScan} onError={handleError} />
      <p>{result}</p>
      <Button
        onClick={(): void => {
          setTest(!test);
        }}
      >
        Button
      </Button>
      <Button component={Link} to="/">
        Distributor
      </Button>
    </Box>
  );
};
