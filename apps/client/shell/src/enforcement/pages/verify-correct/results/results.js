/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Zones from '../zones.container';
import Infraction from '../infraction.container';
import NoResults from '../../../shared/no-results';
import useKey from '../../../hooks/use-key';
import { imageTypes, infractionEvents } from '../../../enforcement.enums';
import keys from '../../../../languages/keys';

const useStyles = makeStyles(() => ({
  container: {
    overflow: 'auto',
    display: 'grid',
  },
  results: {
    overflow: 'auto',
    overflowX: 'hidden',
    display: 'grid',
    gridTemplateColumns: '200px  auto',
  },
}));

const Results = ({
  zones,
  activeInfraction,
  onEventUpdate,
  activeImageViewer,
  isEditing,
  fetchedResults,
  onActiveImage,
  searchDate,
}) => {
  const classes = useStyles();
  const [displayNoResults, setDisplayNoResults] = useState(
    zones.length === 0 && fetchedResults
  );
  const [displayResults, setDisplayResults] = useState(
    zones.length > 0 || fetchedResults
  );

  useEffect(() => {
    setDisplayNoResults(zones.length === 0 && fetchedResults);
    setDisplayResults(zones.length > 0 || fetchedResults);
  }, [fetchedResults, zones]);

  const handleArrowDown = () => {
    onEventUpdate({
      activeInfraction,
      event: infractionEvents.verify,
    });
  };

  const handleBackspace = () => {
    onEventUpdate({
      activeInfraction,
      event: infractionEvents.ignore,
    });
  };

  const handleArrowRight = () => {
    onActiveImage({ isActive: true, index: 0 });
  };

  const handleArrowLeft = () => {
    const images = activeInfraction.enforcementPhotos.filter(
      (p) =>
        p.imageType !== imageTypes.plate && p.imageType !== imageTypes.hidden
    );
    onActiveImage({ isActive: true, index: images.length - 1 });
  };

  useKey(
    'ArrowDown',
    !isEditing ? handleArrowDown : () => {},
    activeImageViewer
  );

  useKey('Delete', !isEditing ? handleBackspace : () => {}, activeImageViewer);

  useKey(
    'ArrowRight',
    !isEditing ? handleArrowRight : () => {},
    activeImageViewer
  );

  useKey(
    'ArrowLeft',
    !isEditing ? handleArrowLeft : () => {},
    activeImageViewer
  );

  return (
    <div className={classes.container}>
      {displayNoResults && searchDate === null && (
        <NoResults messageId={keys.noInfractions} />
      )}
      {displayResults && searchDate !== null && !displayNoResults && (
        <div className={classes.results}>
          <Zones />
          <Infraction />
        </div>
      )}
    </div>
  );
};

export default Results;
