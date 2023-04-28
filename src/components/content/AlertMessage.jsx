import { Alert, AlertTitle } from '@mui/material';

export const AlertMessage = ({ severity, message }) => {
  return (
    <Alert severity={severity}>
      <AlertTitle>{severity}</AlertTitle>
      {message}
    </Alert>
  );
};