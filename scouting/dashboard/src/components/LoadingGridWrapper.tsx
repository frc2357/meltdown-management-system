import { Grid, Skeleton } from '@mui/material';

export type TLoadingGridProps = React.PropsWithChildren<{
  isLoading: boolean;
  numCharts: number;
}>;

export function LoadingGridWrapper({
  children,
  isLoading,
  numCharts,
}: TLoadingGridProps): React.JSX.Element {
  if (isLoading) {
    return (
      <Grid
        columnSpacing={2}
        rowSpacing={2}
        container
        sx={{ margin: 1 }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {new Array(numCharts).fill(0).map(() => (
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Skeleton variant="rounded" sx={{ fontSize: '5rem', height: 300 }} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return <>{children}</>;
}
