import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    height: '100%',
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
    'justify-content': 'center'
  }
});

const Center = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {children}
    </div>
  );
};

export default Center;
