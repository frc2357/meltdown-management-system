import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts';

export type TBarCardProps = {
  title: string;
  dataset: { value: number; label: string }[];
};

export function BarCard({ title, dataset }: TBarCardProps): React.JSX.Element {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          {title}
        </Typography>
        <BarChart
          dataset={dataset}
          xAxis={[{ scaleType: 'band', dataKey: 'label' }]}
          series={[{ dataKey: 'value' }]}
          height={300}
        />
      </CardContent>
    </Card>
  );
}
