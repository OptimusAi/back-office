import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Backdrop } from '@material-ui/core';

const Busy = ({busy = false}) => (
  <Backdrop open={busy}>
    <CircularProgress />
  </Backdrop>
);

export default Busy;
