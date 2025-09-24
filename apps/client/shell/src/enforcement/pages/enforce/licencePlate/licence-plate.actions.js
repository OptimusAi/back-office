/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import keys from '../../../../languages/keys';
import { infractionEvents, infractionStatus } from '../../../enforcement.enums';
import NextIcon from '@material-ui/icons/ChevronRight';
import ByLawsSelector from './by-laws.selector';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { roleTypes } from '../../../../admin/admin.enums';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'auto auto 1fr',
    width: '100%',
  },
  actions: {
    width: 'auto',
  },
  byLaws: {
    alignSelf: 'center',
    marginLeft: theme.spacing(2),
  },
  actionButton: {
    margin: theme.spacing(),
  },
  infractionSelected: {
    margin: theme.spacing(),
    outline: `2px solid ${theme.palette.error.main}`,
  },
  warningSelected: {
    margin: theme.spacing(),
    outline: `2px solid ${theme.palette.warning.main}`,
  },
  ignoreSelected: {
    margin: theme.spacing(),
    outline: `2px solid ${theme.palette.grey[600]}`,
  },
  ignoredMarker: {
    fill: theme.palette.grey[700],
  },
  infractionMarker: {
    fill: theme.palette.error.dark,
  },
  warningMarker: {
    fill: theme.palette.warning.dark,
  },
  marker: {
    fill: theme.palette.grey[200],
  },
  navigation: {
    justifySelf: 'flex-end',
  },
}));

const LicencePlateActions = ({
  onNextPlate,
  activeInfraction,
  handleEventUpdate,
  onRequestBylaws,
  onBylawUpdate,
  availableBylaws,
  licencePlateInfractions,
  activeInfractionEvent,
  permissions,
}) => {
  const classes = useStyles();
  const isAdminOrEnforcement =
    permissions.includes(roleTypes[0]) || permissions.includes(roleTypes[1]);

  const getIgnoreButtonStyles = () => {
    if (activeInfractionEvent) {
      return activeInfractionEvent === infractionEvents.reject
        ? classes.ignoreSelected
        : classes.actionButton;
    } else {
      if (
        activeInfraction.event === infractionEvents.reject ||
        activeInfraction.status === infractionStatus.rejected
      ) {
        return classes.ignoreSelected;
      }
      if (
        activeInfraction.event === infractionEvents.enforceable &&
        activeInfraction.status === infractionStatus.rejected
      ) {
        return classes.actionButton;
      }
      if (
        activeInfraction.event === infractionEvents.warningIssued &&
        activeInfraction.status === infractionStatus.warning
      ) {
        return classes.actionButton;
      }
    }
    return classes.actionButton;
  };

  const getInfractionButtonStyles = () => {
    if (activeInfractionEvent) {
      return activeInfractionEvent === infractionEvents.approve
        ? classes.infractionSelected
        : classes.actionButton;
    } else {
      if (
        activeInfraction.event === infractionEvents.approve ||
        activeInfraction.status === infractionStatus.approved
      ) {
        return classes.infractionSelected;
      }
      if (
        activeInfraction.event === infractionEvents.reject &&
        activeInfraction.status === infractionStatus.enforceable
      ) {
        return classes.actionButton;
      }
      if (
        activeInfraction.event === infractionEvents.warningIssued &&
        activeInfraction.status === infractionStatus.warning
      ) {
        return classes.actionButton;
      }
    }
    return classes.actionButton;
  };

  const getWarningButtonStyles = () => {
    if (activeInfractionEvent) {
      return activeInfractionEvent === infractionEvents.warningIssued
        ? classes.warningSelected
        : classes.actionButton;
    } else {
      if (
        activeInfraction.event === infractionEvents.warningIssued ||
        activeInfraction.status === infractionStatus.warning
      ) {
        return classes.warningSelected;
      }
      if (
        activeInfraction.event === infractionEvents.reject &&
        activeInfraction.status === infractionStatus.enforceable
      ) {
        return classes.actionButton;
      }
      if (
        activeInfraction.event === infractionEvents.approve &&
        activeInfraction.status === infractionStatus.approved
      ) {
        return classes.actionButton;
      }
    }
    return classes.actionButton;
  };

  return (
    <div className={classes.container}>
      <div className={classes.actions}>
        <Button
          data-testid="ignoreButton"
          className={getIgnoreButtonStyles()}
          variant="outlined"
          onClick={() =>
            isAdminOrEnforcement
              ? handleEventUpdate(activeInfraction.id, infractionEvents.reject)
              : () => {}
          }
          startIcon={
            <FiberManualRecordIcon className={classes.ignoredMarker} />
          }
        >
          <FormattedMessage id={keys.ignoreAction} />
        </Button>
        <Button
          className={getInfractionButtonStyles()}
          variant="outlined"
          onClick={() =>
            isAdminOrEnforcement
              ? handleEventUpdate(activeInfraction.id, infractionEvents.approve)
              : () => {}
          }
          startIcon={
            <FiberManualRecordIcon className={classes.infractionMarker} />
          }
        >
          <FormattedMessage id={keys.infractionAction} />
        </Button>
        <Button
          className={getWarningButtonStyles()}
          variant="outlined"
          onClick={() =>
            isAdminOrEnforcement
              ? handleEventUpdate(
                  activeInfraction.id,
                  infractionEvents.warningIssued
                )
              : () => {}
          }
          startIcon={
            <FiberManualRecordIcon className={classes.warningMarker} />
          }
        >
          <FormattedMessage id={keys.warningAction} />
        </Button>
      </div>
      <div className={classes.navigation}>
        <Button
          data-testid="nextPlateButton"
          variant="outlined"
          className={classes.actionButton}
          onClick={() =>
            isAdminOrEnforcement
              ? onNextPlate(licencePlateInfractions)
              : () => {}
          }
        >
          <FormattedMessage id={keys.nextPlate} />
          <NextIcon />
        </Button>
      </div>
      <div className={classes.byLaws}>
        <ByLawsSelector
          activeInfraction={activeInfraction}
          onRequestBylaws={onRequestBylaws}
          onBylawUpdate={isAdminOrEnforcement ? onBylawUpdate : () => {}}
          availableBylaws={availableBylaws}
        />
      </div>
    </div>
  );
};

export default LicencePlateActions;
