import React, { useState } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import {
  makeStyles,
  ListItem,
  ListItemText,
  Typography,
  LinearProgress,
  ListItemSecondaryAction,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import keys from '../../../../../languages/keys';

const useStyles = makeStyles((theme) => ({
  summary: {
    display: 'grid',
    gridTemplateRows: 'auto auto',
  },
  complete: {
    backgroundColor: theme.palette.success.main,
  },
}));

const Zone = ({ zone, selected, onSelectZone, onMarkZone, onRelease }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const intl = useIntl();

  const onOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  const onMark = (zone) => {
    onMarkZone(zone);
    onClose();
    closeDialog();
  };

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    onClose();
  };

  const handleClick = () => {
    if (zone.completionRatio === 1) {
      onRelease();
    }
    onSelectZone(zone);
  };

  const getRemainingInfractions = (zone) => {
    const totalRemaining =
      (1.0 - zone.completionRatio) * zone.totalInfractionsInZone;
    if (!Number.isInteger(totalRemaining)) {
      return `${Math.round(totalRemaining)}/${zone.totalInfractionsInZone}`;
    }
    return `${totalRemaining}/${zone.totalInfractionsInZone}`;
  };
  return (
    <ListItem button selected={selected} data-testid="zoneListItem">
      <ListItemText>
        <div className={classes.summary} onClick={handleClick}>
          <div data-testid="zoneName">{zone.zone}</div>
          <Typography variant="caption">{` ${getRemainingInfractions(
            zone
          )} ${intl.formatMessage({
            id: keys.remaining,
          })}`}</Typography>
          <LinearProgress
            variant="determinate"
            value={zone.completionRatio * 100}
            classes={
              zone.completionRatio * 100 === 100
                ? { barColorPrimary: classes.complete }
                : {}
            }
          />
        </div>
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton edge="end">
          <MoreIcon onClick={onOpen} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={onClose}
        >
          <MenuItem onClick={openDialog}>
            {intl.formatMessage({ id: keys.markAsEnforceable })}
          </MenuItem>
        </Menu>
        <Dialog
          open={open}
          onClose={closeDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {intl.formatMessage({ id: keys.markAsEnforceableDialogTitle })}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <FormattedMessage
                id={keys.markAsEnforceableDialog}
                values={{ zone: zone.zone }}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog} color="primary">
              {intl.formatMessage({ id: keys.sendToEnforceCancel })}
            </Button>
            <Button onClick={() => onMark(zone)} color="primary" autoFocus>
              {intl.formatMessage({ id: keys.sendToEnforceConfirm })}
            </Button>
          </DialogActions>
        </Dialog>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Zone;
