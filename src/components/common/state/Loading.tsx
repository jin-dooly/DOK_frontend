import { LoadingLayout } from './States.styled';
import { CircularProgress } from '@mui/material';

export function Loading() {
  return (
    <LoadingLayout>
      <CircularProgress />
    </LoadingLayout>
  );
}
