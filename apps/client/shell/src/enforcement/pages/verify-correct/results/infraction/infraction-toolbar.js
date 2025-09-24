import React, { useState } from 'react';
import classNames from 'classnames';
import {
  makeStyles,
  Toolbar,
  Typography,
  IconButton,
  Popover,
} from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { lighten } from '@material-ui/core/styles';
import InfractionHelp from './infraction-help';
import keys from '../../../../../languages/keys';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: lighten(theme.palette.grey.main, 0.2),
    color: theme.palette.common.white,
    height: '48px',
    position: 'absolute',
    zIndex: 1,
    width: 'calc(100% - 297px)'
  },
  sticky: {
    position: 'fixed'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: theme.spacing(),
  },
  title: {
    marginLeft: theme.spacing(),
  },
  helpIcon: {
    color: theme.palette.common.white,
  },
}));

const InfractionToolbar = ({ sticky }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className={ sticky ? classNames(classes.sticky, classes.container) : classNames(classes.container)}>
      <Toolbar variant="dense" classes={{ root: classes.toolbar }}>
        <Typography variant="subtitle1" noWrap className={classes.title}>
          <FormattedMessage id={keys.potentialInfractionTitle} />
        </Typography>
        <IconButton
          className={classes.helpIcon}
          onClick={(e) => handleClick(e)}
        >
          <HelpOutlineIcon />
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <InfractionHelp />
        </Popover>
      </Toolbar>
    </div>
  );
};

export default InfractionToolbar;
