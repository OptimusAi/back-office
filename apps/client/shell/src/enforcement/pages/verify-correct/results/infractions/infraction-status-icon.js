import React from 'react';
import { makeStyles } from '@material-ui/core';
import EnforceableIcon from '@material-ui/icons/Done';
import IgnoredIcon from '@material-ui/icons/Clear';
import UnverifiedIcon from '@material-ui/icons/Remove';
import { infractionStatus } from '../../../../enforcement.enums';

const useStyles = makeStyles((theme) => ({
  enforceable: {
    color: theme.palette.success.main,
  },
  ignored: {
    color: theme.palette.error.main,
  },
  unverified: {
    color: theme.palette.grey.main,
  },
  infraction: {
    color: theme.palette.grey.main,
  },
}));

const InfractionStatusIcon = ({ status }) => {
  const classes = useStyles();

  if (status === infractionStatus.verified) {
    return (
      <EnforceableIcon
        className={classes.enforceable}
        data-testid="enforceable-icon"
      />
    );
  }
  if (status === infractionStatus.ignored) {
    return (
      <IgnoredIcon className={classes.ignored} data-testid="ignored-icon" />
    );
  }
  if (status === infractionStatus.unverified) {
    return (
      <UnverifiedIcon
        className={classes.unverified}
        data-testid="unverified-icon"
      />
    );
  }
  return (
    <UnverifiedIcon
      className={classes.unverified}
      data-testid="unverified-icon"
    />
  );
};

export default InfractionStatusIcon;
