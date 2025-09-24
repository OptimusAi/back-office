import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

const ByLawsSelector = ({
  activeInfraction,
  onBylawUpdate,
  onRequestBylaws,
  availableBylaws,
}) => {
  const classes = useStyles();
  const [bylaws, setBylaws] = useState([]);

  useEffect(() => {
    if (availableBylaws === null) {
      onRequestBylaws();
    }
    setBylaws(availableBylaws === null ? [] : availableBylaws);
  }, [activeInfraction, availableBylaws, onRequestBylaws]);

  useEffect(() => {
    if (
      activeInfraction.bylaw === undefined
    ) {
      if (availableBylaws) {
        const defaultBylaw = availableBylaws.findIndex(
          (bylaw) => bylaw.defaultBylaw
        );
        if (defaultBylaw !== -1) {
          onBylawUpdate({
            id: activeInfraction.id,
            bylaw: availableBylaws[defaultBylaw].bylaw.id,
          });
        }
      }
    }
  }, [activeInfraction, availableBylaws, onBylawUpdate]);

  const handleChange = (event) => {
    onBylawUpdate({ id: activeInfraction.id, bylaw: event.target.value });
  };

  return (
    <div>
      <RadioGroup
        onChange={handleChange}
        className={classes.container}
      >
        {bylaws.map((item, index) => (
          <FormControlLabel
            label={item.bylaw.sectionCode}
            checked={activeInfraction.bylaw === item.bylaw.id}
            key={index}
            value={item.bylaw.id}
            control={<Radio />}
          />
        ))}
      </RadioGroup>
    </div>
  );
};

export default ByLawsSelector;

