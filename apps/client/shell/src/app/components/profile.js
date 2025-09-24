import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { ButtonBase, makeStyles, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import keys from '../../languages/keys';
import routes from '../../routes';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    userSelect: 'none',
  },
  profile: {
    color: theme.palette.primary.contrastText,
  },
}));

const Profile = ({
  user,
  activeInfraction,
  activeLicencePlateId,
  onClickAway,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const intl = useIntl();

  const open = (event) => setAnchorEl(event.currentTarget);
  const close = () => setAnchorEl(null);

  const handleLogout = async () => {
    if (activeInfraction !== null || activeLicencePlateId !== null) {
      onClickAway();
    }
  };

  return (
    <div className={classes.container}>
      <Button className={classes.profile} onClick={open}>
        <FormattedMessage
          id={keys.profileGreeting}
          values={{ name: user.firstName }}
        />
      </Button>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={close}
      >
        <MenuItem onClick={handleLogout}>
          <ButtonBase to={routes.logout} exact component={NavLink} >
            <Typography variant="caption">
              {intl.formatMessage({ id: keys.logout })}
            </Typography>
          </ButtonBase>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Profile;
