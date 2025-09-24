import React from 'react';
import { useIntl } from 'react-intl';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const PopupMessage = ({ message, type, open, onClearMessage }) => {
  const intl = useIntl();
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    onClearMessage();
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert severity={type !== null ? type : 'error'}>
        {type === 'success' &&
          `${intl.formatMessage({ id: 'infractionMoved' })} ${message}`}
        {type !== 'success' && message !== null && message !== undefined
          ? message
          : ''}
      </Alert>
    </Snackbar>
  );
};

export default PopupMessage;
