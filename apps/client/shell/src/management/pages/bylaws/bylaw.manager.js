import React from 'react';
import { makeStyles } from '@material-ui/styles';
import BusyAware from '../../../app/busy-aware.container';
import Popup from '../../../app/popup.container';
import Bylaws from './bylaws.container';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    height: '100%',
  },
}));

const BylawManager = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <BusyAware>
        <Bylaws />
        <Popup />
      </BusyAware>
    </div>
  );
};

export default BylawManager;
