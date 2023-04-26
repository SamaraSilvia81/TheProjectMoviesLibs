import { Alert, AlertTitle } from '@mui/material';

const AlertMessage = ({ severity, message }) => {
  return (
    <Alert severity={severity}>
      <AlertTitle>{severity}</AlertTitle>
      {message}
    </Alert>
  );
};

export default AlertMessage;