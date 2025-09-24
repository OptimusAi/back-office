import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop, Typography } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    border: 'none',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const BackdropModal = ({ isActive, message }) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  return (
    <Backdrop open={isActive}>
      <div style={modalStyle} className={classes.paper}>
        <Typography>{message}</Typography>
      </div>
    </Backdrop>
  );
};

export default BackdropModal;
