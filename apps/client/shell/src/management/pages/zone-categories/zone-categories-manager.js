import React from 'react';
import { makeStyles } from '@material-ui/styles';
import BusyAware from '../../../app/busy-aware.container';
import Popup from '../../../app/popup.container';
import ZoneCategories from './zone-categories.container';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    height: '100%',
  }
}));

const ZoneManager = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <BusyAware>
        <ZoneCategories />
        <Popup />
      </BusyAware>
    </div>
  );
};

export default ZoneManager;