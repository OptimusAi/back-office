import React from 'react';
import { makeStyles } from '@material-ui/core';
import SearchBar from './search-bar.container';
import Results from './results.container';
import BusyAware from '../../../app/busy-aware.container';
import Popup from '../../../app/popup.container';

const useStyles = makeStyles(() => ({
  container: {
    height: '100%',
    overflowY: 'auto',
    display: 'grid',
    gridTemplateRows: 'auto calc(100vh - 162px)',
  },
}));

const VerifyCorrect = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <SearchBar />
      <BusyAware>
        <Results />
        <Popup />
      </BusyAware>
    </div>
  );
};

export default VerifyCorrect;
