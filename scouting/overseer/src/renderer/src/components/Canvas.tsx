import React, { useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

export function Canvas(): React.JSX.Element {
  const canvasRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (isDragging && lastMousePosition) {
      const dx = e.clientX - lastMousePosition.x;
      const dy = e.clientY - lastMousePosition.y;
      setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      setLastMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setLastMousePosition(null);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const newScale = Math.max(0.1, scale - e.deltaY * 0.01);
    setScale(newScale);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid #ccc',
        width: '100%',
        height: '500px',
      }}
    >
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          transformOrigin: '0 0',
          width: '100%',
          height: '100%',
        }}
      >
        <Box sx={{ color: 'red', height: 100, width: 100 }}></Box>
      </canvas>
      <Box position="absolute" top={0} left={0} p={2}>
        <Typography variant="h6">Zoom Level: {Math.round(scale * 100)}%</Typography>
        <Button onClick={() => setScale(1)}>Reset Zoom</Button>
      </Box>
    </Box>
  );
}
