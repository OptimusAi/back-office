import React from 'react';
import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Title } from '@park-plus/ui';
import Profile from './profile';

const useStyles = makeStyles((theme) => ({
  bar: {
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    flexGrow: 1,
    userSelect: 'none',
  },
  accent: {
    height: '2px',
    backgroundColor: theme.palette.accent.main,
  },
}));

const Header = ({ title, className, user, activeInfraction, onClickAway }) => {
  const classes = useStyles();
  return (
    <div className={className}>
      <AppBar position="sticky" className={classes.bar}>
        <Toolbar variant="regular">
          <Title className={classes.title}>{title}</Title>
          <Profile
            user={user}
            activeInfraction={activeInfraction}
            onClickAway={onClickAway}
          />
        </Toolbar>
      </AppBar>
      <div className={classes.accent} />
    </div>
  );
};

export default Header;
