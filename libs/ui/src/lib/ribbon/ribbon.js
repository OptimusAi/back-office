import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  banner: {
    width: 200,
    top: 9,
    left: -84,
    background: theme.palette.accent.main,
    color: theme.palette.common.white,
    fontSize: theme.typography.caption.fontSize,
    position: "absolute",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1,
    transform: "rotate(-45deg)",
    zIndex: 9999,
  },
}));

const Ribbon = ({text}) => {
  const classes = useStyles();
  return (
    <div className={classes.banner}>{text}</div>
  );
};

export default Ribbon;

