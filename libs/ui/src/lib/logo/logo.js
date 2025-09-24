import React from 'react';
import { makeStyles } from '@material-ui/core';
import src from './logo.jpg';

const useStyles = makeStyles(() => ({
  image: {
    width: '200px',
    height: '200px',
    animation: '$beat 4s linear infinite',
  },
  '@keyframes beat': {
    '0%': { transform: 'scale(1)' },
    '25%': { transform: 'scale(1.1)' },
    '40%': { transform: 'scale(1)' },
    '60%': { transform: 'scale(1.2)' },
    '100%': { transform: 'scale(1)' }
  },
}));

const Logo = () => {
  const classes = useStyles();
  return (
    <img className={classes.image} src={src} alt="Calgary Parking Authority" />
  );
}

export default Logo;
