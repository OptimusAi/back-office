import React, { useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { makeStyles, darken } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import DashboardIcon from '@material-ui/icons/TrendingUp';
import EnforcementIcon from '@material-ui/icons/Policy';
import ZonesIcon from '@material-ui/icons/PinDrop';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import Typography from '@material-ui/core/Typography';
import { routes } from '../../routes';
import { roleTypes } from '../../admin/admin.enums';
import keys from '../../languages/keys';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
  },
}));

const useNavItemStyles = makeStyles((theme) => ({
  item: {
    padding: theme.spacing(1.5),
    display: 'grid',
    justifyItems: 'center',
  },
  active: {
    backgroundColor: darken(theme.palette.primary.light, 0.15),
  },
}));

const NavItem = ({ to, children, text }) => {
  const classes = useNavItemStyles();

  return (
    <ButtonBase
      component={NavLink}
      to={to}
      exact
      className={classes.item}
      activeClassName={classes.active}
    >
      {children}
      <Typography variant="caption">{text}</Typography>
    </ButtonBase>
  );
};

const NavBar = ({
  className,
  permissions,
  onClickAway,
  activeInfraction,
  activeLicencePlateId,
}) => {
  const classes = useStyles();
  const intl = useIntl();
  const [verificationOrEnforce, setVerificationOrEnforce] = useState(false);
  permissions.includes(roleTypes[1]) || permissions.includes(roleTypes[2]);
  const location = useLocation();

  useEffect(() => {
    if (activeInfraction === null && activeLicencePlateId === null) {
      return;
    } else {
      if (
        location.pathname === '/' ||
        location.pathname === '/zones' ||
        location.pathname === '/admin'
      ) {
        onClickAway();
      }
    }
  }, [location, onClickAway, activeInfraction, activeLicencePlateId]);

  useEffect(() => {
    setVerificationOrEnforce(
      permissions.includes(roleTypes[1]) || permissions.includes(roleTypes[2])
    );
  }, [permissions]);

  return (
    <div className={classNames(classes.container, className)}>
      <NavItem
        to={routes.dashboard}
        text={intl.formatMessage({ id: keys.dashboardTitle })}
      >
        <DashboardIcon fontSize="large" />
      </NavItem>
      {verificationOrEnforce && (
        <NavItem
          to={routes.enforcement}
          text={intl.formatMessage({ id: keys.enforcementTitle })}
        >
          <EnforcementIcon fontSize="large" />
        </NavItem>
      )}
      <NavItem
        to={routes.zones}
        text={intl.formatMessage({ id: keys.zonesTitle })}
      >
        <ZonesIcon fontSize="large" />
      </NavItem>
      {permissions.includes(roleTypes[0]) && (
        <NavItem
          to={routes.admin}
          text={intl.formatMessage({ id: keys.adminTitle })}
        >
          <SupervisorAccountIcon fontSize="large" />
        </NavItem>
      )}
    </div>
  );
};

export default NavBar;
