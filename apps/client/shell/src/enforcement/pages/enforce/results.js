import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import LicencePlate from '../../pages/enforce/licencePlate/licence-plate.container';

const useStyles = makeStyles(() => ({
  container: {
    overflow: 'auto',
    display: 'flex',
    justifyContent: 'center',
  },
}));

const Results = ({ fetchedPlate, licencePlates }) => {
  const classes = useStyles();
  const [displayResults] = useState(licencePlates.length > 0 || fetchedPlate);

  return (
    <div className={classes.container}>
      {displayResults && <LicencePlate />}
    </div>
  );
};

export default Results;
