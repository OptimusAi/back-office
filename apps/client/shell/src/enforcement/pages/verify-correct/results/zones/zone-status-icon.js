import React from 'react';
import { makeStyles } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/CheckCircle';
import NotDoneIcon from '@material-ui/icons/RemoveCircle';
import { zoneStatus } from '../../../../enforcement.enums';

const useStyles = makeStyles((theme) => ({
  notDone: {
    color: theme.palette.grey.main,
  },
  done: {
    color: theme.palette.success.main,
  },
}));

const ZoneStatusIcon = ({ status }) => {
  const classes = useStyles();
  return status === zoneStatus.done ? (
    <DoneIcon className={classes.done} />
  ) : (
    <NotDoneIcon className={classes.notDone} />
  );
};

export default ZoneStatusIcon;
