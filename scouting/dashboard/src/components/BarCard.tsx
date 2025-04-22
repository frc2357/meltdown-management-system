import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts';

const BarCard: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          Super cool data
        </Typography>
        <BarChart
          xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
          series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
          height={300}
        />
      </CardContent>
    </Card>
  );
};

export default BarCard;
