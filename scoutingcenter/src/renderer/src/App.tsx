import { Button } from '@mui/material';
import { useState } from 'react';
import QrReader from 'react-qr-scanner';
import './App.css';

function App() {
  const [result, setResult] = useState("");
  const [test, setTest] = useState(false);

  const handleScan = (data) => {
    console.log(JSON.stringify(data));
    setResult(JSON.stringify(data))
  }

  const handleError = (err) => {
    console.error(err)
  }
 
  return (
    <div>
        <QrReader
          delay={100}
          style={{
            height: 240,
            width: 320,
          }}
          onError={handleError}
          onScan={handleScan}
          />
        <p>{result}</p>
        <Button onClick={() => {setTest(!test)}}>Button</Button>
      </div>
  );
}

export default App;
