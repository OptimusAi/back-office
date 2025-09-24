import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import InfractionDetails from './infraction/infraction.details';
import InfractionImages from './infraction/infraction.images';
import LicencePlateToolbar from './licence-plate.toolbar';
import { getFormattedImages } from '../../../enforcement.mappers';
import LicencePlateTimeline from '../licencePlate/licence-plate.timeline';
import LicencePlateActions from './licence-plate.actions';
import {
  getPlateImage,
  sortByEntryExit,
} from '../../../../utils/enforcement.utils';
import NoResults from '../../../shared/no-results';
import keys from '../../../../languages/keys';
import { requestStatus } from '../../../enforcement.enums';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
}));

const LicencePlate = ({
  activeLicencePlate,
  activeLicencePlateId,
  activeInfraction,
  originalActiveInfraction,
  regions,
  zones,
  availableBylaws,
  onNextPlate,
  onImageUpdate,
  onLicencePlateUpdate,
  onZoneUpdate,
  onEventUpdate,
  onBylawUpdate,
  onRequestBylaws,
  onInfractionSelect,
  licencePlateInfractions,
  onInfractionUpdate,
  activeImageViewer,
  activeImage,
  onActiveImage,
  activeInfractionEvent,
  onEditing,
  permissions,
  onLicencePlateRequest,
  plateRequestStatus,
  fetchedPlate,
  licencePlates,
  searchDate,
  releasedPlate,
}) => {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const [licencePlateImage, setLicencePlateImage] = useState({});
  const [notFoundText, setNotFoundText] = useState(
    fetchedPlate && licencePlates.length === 0 ? keys.noLicencePlate : keys.void
  );

  useEffect(() => {
    if (fetchedPlate) {
      setNotFoundText(keys.noLicencePlate);
    }
  }, [fetchedPlate]);

  useEffect(() => {
    if (plateRequestStatus === requestStatus.inProgress) {
      return;
    }
    if (activeLicencePlateId === null && releasedPlate === undefined) {
      onLicencePlateRequest();
    }
  }, [
    onLicencePlateRequest,
    plateRequestStatus,
    activeLicencePlateId,
    searchDate,
    releasedPlate,
  ]);

  useEffect(() => {
    if (activeInfraction) {
      const getImages = async () => {
        let images = [];
        if (activeInfraction.observations.length === 2) {
          const sortedImages = sortByEntryExit(activeInfraction);
          images = await getFormattedImages(sortedImages);
        } else {
          images = await getFormattedImages(activeInfraction.enforcementPhotos);
        }
        setImages(await images);

        const plateImage = getPlateImage(activeInfraction, images);
        if (plateImage) {
          setLicencePlateImage(plateImage);
        }
      };
      getImages();
    }
  }, [activeInfraction, activeInfraction?.enforcementPhotos]);

  const handleLicencePlateUpdate = (licencePlateObj) => {
    const updatedLicencePlateNumber = licencePlateObj.licencePlateNumber;
    const updatedCountrySubdivision =
      licencePlateObj.countrySubdivision ||
      activeInfraction.licencePlate.countrySubdivision;
    const licencePlate = {
      licencePlateNumber: updatedLicencePlateNumber,
      countrySubdivision: {
        ...updatedCountrySubdivision,
      },
    };
    onLicencePlateUpdate({ id: activeInfraction.id, licencePlate });
  };

  const handleZoneUpdate = (zone) => {
    onZoneUpdate({ id: activeInfraction.id, zone: zone });
  };

  const handleEventUpdate = (activeInfractionId, event) => {
    onEventUpdate(activeInfractionId, event);
  };

  return activeLicencePlate !== undefined ? (
    <div className={classes.container}>
      <LicencePlateToolbar licencePlate={activeLicencePlate} />
      <InfractionDetails
        permissions={permissions}
        activeInfraction={activeInfraction}
        originalActiveInfraction={originalActiveInfraction}
        licencePlateImage={licencePlateImage}
        handleLicencePlateUpdate={handleLicencePlateUpdate}
        handleZoneUpdate={handleZoneUpdate}
        onInfractionUpdate={onInfractionUpdate}
        regions={regions}
        zones={zones}
        onEditing={onEditing}
      />
      <InfractionImages
        permissions={permissions}
        images={images.filter((img) => img.imageType !== 'PLATE')}
        selectable
        onImageUpdate={onImageUpdate}
        activeInfraction={activeInfraction}
        activeImageViewer={activeImageViewer}
        activeImage={activeImage}
        onActiveImage={onActiveImage}
      />
      <LicencePlateTimeline
        activeLicencePlate={activeLicencePlate}
        activeInfraction={activeInfraction}
        onInfractionSelect={onInfractionSelect}
        licencePlateInfractions={licencePlateInfractions}
      />
      <LicencePlateActions
        permissions={permissions}
        onNextPlate={onNextPlate}
        activeLicencePlate={activeLicencePlate}
        activeInfraction={activeInfraction}
        handleEventUpdate={handleEventUpdate}
        onRequestBylaws={onRequestBylaws}
        onBylawUpdate={onBylawUpdate}
        availableBylaws={availableBylaws}
        licencePlateInfractions={licencePlateInfractions}
        activeInfractionEvent={activeInfractionEvent}
      />
    </div>
  ) : searchDate !== null ? (
    <NoResults messageId={notFoundText} />
  ) : null;
};

export default LicencePlate;
