/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { makeStyles, List } from '@material-ui/core';
import InfractionsToolbar from './infractions-toolbar';
import { infractionStatus } from '../../../../enforcement.enums';
import Infraction from './infraction';
import useSticky from '../../../../hooks/use-sticky';

const useStyles = makeStyles((theme) => ({
  container: {
    overflowY: 'auto',
    display: 'grid',
    gridTemplateRows: ' auto 1fr',
    minWidth: '200px',
  },
  infractions: {
    overflowY: 'scroll',
  },
  infraction: {
    paddingLeft: theme.spacing(),
  },
  summary: {
    paddingLeft: theme.spacing(),
  },
}));

const Infractions = ({
  activeZone,
  activeInfraction,
  activeInfractionId,
  infractions,
  onSelectInfraction,
}) => {
  const classes = useStyles();
  const [displayResults, setDisplayResults] = useState(
    infractions === undefined ? [] : infractions
  );
  const [filterBy, setFilterBy] = useState(null);
  const { isSticky, element } = useSticky();

  useEffect(() => {
    if (filterBy === null) {
      setDisplayResults(infractions);
    }
    if (filterBy === 1) {
      setDisplayResults(
        infractions.filter(
          (infraction) => infraction.status === infractionStatus.unverified
        )
      );
    }
    if (filterBy === 2) {
      setDisplayResults(
        infractions.filter(
          (infraction) => infraction.status === infractionStatus.verified
        )
      );
    }
    if (filterBy === 3) {
      setDisplayResults(
        infractions.filter(
          (infraction) => infraction.status === infractionStatus.ignored
        )
      );
    }
  }, [filterBy, infractions]);

  useEffect(() => {
    if (infractions === undefined) {
      setDisplayResults([]);
      return;
    }
    if (infractions.length > 0) {
      setDisplayResults(infractions);
    }
  }, [infractions]);

  const removeInfractionFilter = () => setDisplayResults(infractions);

  return (
    <div className={classes.container}>
      <InfractionsToolbar
        sticky={isSticky}
        zone={activeZone}
        setFilterBy={setFilterBy}
        removeFilter={removeInfractionFilter}
      />
      <List disablePadding className={classes.infractions} style={{marginTop: '48px'}}>
        {displayResults.length > 0 &&
          displayResults.map((infraction) => (
            <Infraction
              key={infraction.id}
              infraction={infraction}
              activeInfraction={activeInfraction}
              selected={
                activeInfractionId ? infraction.id === activeInfractionId : null
              }
              onSelectInfraction={onSelectInfraction}
            />
          ))}
      </List>
    </div>
  );
};

export default Infractions;
