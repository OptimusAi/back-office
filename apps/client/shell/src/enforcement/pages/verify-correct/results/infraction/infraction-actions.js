import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import IgnoreIcon from '@material-ui/icons/Clear';
import EnforceableIcon from '@material-ui/icons/Done';
import SkipNext from '@material-ui/icons/SkipNext';
import { FormattedMessage } from 'react-intl';
import keys from '../../../../../languages/keys';
import { infractionEvents, infractionStatus } from '../../../../enforcement.enums';

const useStyles = makeStyles((theme) => ({
  infractionActionsContainer: {
    display: 'inline-flex',
    gridArea: 'actions',
    justifyContent: 'flex-end',
  },
  ignoreButton: {
    margin: `${theme.spacing()}px ${theme.spacing()}px ${theme.spacing()}px 0px`,
  },
  enforceableButton: {
    margin: `${theme.spacing()}px 0px ${theme.spacing()}px ${theme.spacing()}px`,
  },
  skipNextButton: {
    margin: `${theme.spacing()}px 0px ${theme.spacing()}px ${theme.spacing()}px`,
  },
  activeEnforceable: {
    margin: `${theme.spacing()}px 0px ${theme.spacing()}px ${theme.spacing()}px`,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  activeIgnore: {
    margin: `${theme.spacing()}px ${theme.spacing()}px ${theme.spacing()}px 0px`,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  enforceable: {
    color: theme.palette.success.main,
  },
  ignore: {
    color: theme.palette.error.main,
  },
  skipNext: {
    color: theme.palette.warning.main,
  },
}));

const InfractionActions = ({ activeInfraction, handleEventUpdate }) => {
  const classes = useStyles();
  return (
    <div className={classes.infractionActionsContainer}>
      <Button
        tabIndex={-1}
        className={
          activeInfraction.status === infractionStatus.ignored ||
          activeInfraction.event === infractionEvents.ignore
            ? classes.activeIgnore
            : classes.ignoreButton
        }
        variant="outlined"
        onClick={() =>
          handleEventUpdate(activeInfraction.id, infractionEvents.ignore)
        }
        startIcon={<IgnoreIcon className={classes.ignore} />}
      >
        <FormattedMessage id={keys.ignoreAction} />
      </Button>
      <Button
        tabIndex={-1}
        className={
          activeInfraction.status === infractionStatus.verified
          ||
          activeInfraction.event === infractionEvents.verify
            ? classes.activeEnforceable
            : classes.enforceableButton
        }
        variant="outlined"
        onClick={() =>
          handleEventUpdate(activeInfraction.id, infractionEvents.verify)
        }
        startIcon={<EnforceableIcon className={classes.enforceable} />}
      >
        <FormattedMessage id={keys.enforceableAction} />
      </Button>
      <Button
        tabIndex={-1}
        className={classes.skipNextButton}
        variant="outlined"
        onClick={() =>
          handleEventUpdate(activeInfraction.id, infractionEvents.skipNext)
        }
        startIcon={<SkipNext className={classes.skipNext} />}
      >
        <FormattedMessage id={keys.skipAction} />
      </Button>
    </div>
  );
};

export default InfractionActions;
