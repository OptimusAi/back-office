import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import {
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import AllIcon from '@material-ui/icons/Menu';
import FilterIcon from '@material-ui/icons/FilterList';
import MoreIcon from '@material-ui/icons/MoreVert';
import { zoneStatus } from '../../../../enforcement.enums';
import ZoneStatusIcon from './zone-status-icon';
import { FormattedMessage } from 'react-intl';
import keys from '../../../../../languages/keys';

const sendToEnforce = [
  keys.sendToEnforceAllZones,
  keys.sendToEnforceRpp,
  keys.sendToEnforcePrivate,
  keys.sendToEnforceParkade,
  keys.sendToEnforceOnstreet,
];

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    zIndex: 1,
    minWidth: '200px',
    backgroundColor: theme.palette.grey.dark,
    color: theme.palette.common.white,
  },
  stickyContainer: {
    position: 'fixed',
    zIndex: 1,
    width: '100%',
    backgroundColor: theme.palette.grey.dark,
    color: theme.palette.common.white,
  },
  toolbar: {
    paddingLeft: theme.spacing(),
    paddingRight: theme.spacing(),
  },
  toolbarTitle: {
    flex: 1,
  },
  itemText: {
    paddingLeft: theme.spacing(),
  },
}));

const ZonesFilter = ({ onZoneFilterSelect }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const intl = useIntl();

  const onOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const onClose = () => {
    setAnchorEl(null);
  };

  const onChange = (e) => {
    onZoneFilterSelect(e.currentTarget.value);
    onClose();
  };

  return (
    <>
      <IconButton edge="start" color="inherit" onClick={onOpen}>
        <FilterIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        <MenuItem value={zoneStatus.none} onClick={onChange}>
          <AllIcon />
          <div className={classes.itemText}>
            {intl.formatMessage({ id: keys.filterAll })}
          </div>
        </MenuItem>
        <MenuItem value={zoneStatus.notDone} onClick={onChange}>
          <ZoneStatusIcon status={zoneStatus.notDone} />
          <div className={classes.itemText}>
            {intl.formatMessage({ id: keys.filterNotDone })}
          </div>
        </MenuItem>
        <MenuItem value={zoneStatus.done} onClick={onChange}>
          <ZoneStatusIcon status={zoneStatus.done} />
          <div className={classes.itemText}>
            {intl.formatMessage({ id: keys.filterDone })}
          </div>
        </MenuItem>
      </Menu>
    </>
  );
};

const ZonesActions = ({ onSendToEnforce }) => {
  const classes = useStyles();
  const intl = useIntl();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);
  const [zoneCategory, setZoneCategory] = React.useState(null);

  const onOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };
  const onSend = () => {
    onSendToEnforce(zoneCategory);
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

  return (
    <>
      <IconButton color="inherit" size="small" onClick={onOpen}>
        <MoreIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        <MenuItem disabled>
          <div className={classes.itemText} style={{ fontWeight: 600 }}>
            {intl.formatMessage({ id: keys.sendToEnforce })}{' '}
          </div>
        </MenuItem>
        <MenuItem divider />
        {sendToEnforce.map((enforceKey) => (
          <MenuItem
            key={enforceKey}
            onClick={() => {
              setZoneCategory(enforceKey);
              openDialog();
            }}
          >
            <div className={classes.itemText}>
              {intl.formatMessage({ id: enforceKey })}
            </div>
          </MenuItem>
        ))}
      </Menu>
      <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <FormattedMessage id={keys.sendToEnforceDialogTitle} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <FormattedMessage id={keys.sendToEnforceDialog} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            <FormattedMessage id={keys.sendToEnforceCancel} />
          </Button>
          <Button onClick={onSend} color="primary" autoFocus>
            <FormattedMessage id={keys.sendToEnforceConfirm} />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const ZonesToolbar = ({
  onZoneFilterSelect,
  zoneFilter,
  onSendToEnforce,
  sticky,
}) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <div className={sticky ? classes.stickyContainer : classes.container}>
      <Toolbar variant="dense" classes={{ root: classes.toolbar }}>
        <ZonesFilter
          onZoneFilterSelect={onZoneFilterSelect}
          zoneFilter={zoneFilter}
        />
        <Typography className={classes.toolbarTitle} variant="subtitle1">
          {intl.formatMessage({ id: keys.zonesTitle })}
        </Typography>
        <ZonesActions onSendToEnforce={onSendToEnforce} />
      </Toolbar>
    </div>
  );
};

export default ZonesToolbar;
