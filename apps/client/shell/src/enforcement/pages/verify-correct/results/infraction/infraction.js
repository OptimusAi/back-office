/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { makeStyles } from '@material-ui/core';
import Details from './infraction-details';
import Images from './infraction-images';
import InfractionToolbar from './infraction-toolbar';
import { getFormattedImages } from '../../../../enforcement.mappers';
import {
  getPlateImage,
  sortByEntryExit,
} from '../../../../../utils/enforcement.utils';
import NoResults from '../../../../shared/no-results';
import { imageTypes, requestStatus } from '../../../../enforcement.enums';
import keys from '../../../../../languages/keys';
import useSticky from '../../../../hooks/use-sticky';
import { enforcementErrorKeys } from '../../../../enforcement.errors';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
  },
}));

const Infraction = ({
  activeInfraction,
  originalActiveInfraction,
  regions,
  zones,
  activeImageViewer,
  activeImage,
  onImageUpdate,
  onLicencePlateUpdate,
  onEventUpdate,
  onZoneUpdate,
  onActiveImage,
  onEditing,
  onInfractionRequest,
  permissions,
  activeZone,
  infractionRequestStatus,
  error,
}) => {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const [licencePlateImage, setLicencePlateImage] = useState({});
  const { isSticky } = useSticky();
  const intl = useIntl();

  useEffect(() => {
    if (infractionRequestStatus === requestStatus.inProgress) {
      return;
    } else {
      if (activeInfraction === null && activeZone?.id !== '' && activeZone?.completionRatio !== 1) {
        onInfractionRequest();
      }
    }
  }, [
    activeInfraction,
    activeZone,
    onInfractionRequest,
    infractionRequestStatus,
  ]);

  useEffect(() => {
    return () => setImages([]);
  }, []);

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

  const handleEventUpdate = (activeId, event) => {
    const infractionError =
      error !== null && error?.message === enforcementErrorKeys.imageSelect;
    return infractionError ? null : onEventUpdate({ activeInfraction, event });
  };

  const handleZoneUpdate = (zone) => {
    onZoneUpdate({
      id: activeInfraction.id,
      zone: zone,
      activeInfraction,
    });
  };

  useEffect(() => {
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
    if (activeInfraction !== null) {
      getImages();
    }
  }, [activeInfraction]);

  return activeInfraction === null ? (
    <NoResults messageId={keys.noInfractions} />
  ) : (
    <div className={classes.container}>
      <InfractionToolbar sticky={isSticky} infraction={activeInfraction} />
      <Details
        permissions={permissions}
        activeInfraction={activeInfraction}
        originalActiveInfraction={originalActiveInfraction}
        licencePlateImage={licencePlateImage}
        handleLicencePlateUpdate={handleLicencePlateUpdate}
        handleZoneUpdate={handleZoneUpdate}
        handleEventUpdate={handleEventUpdate}
        regions={regions}
        zones={zones}
        onEditing={onEditing}
      />
      <Images
        permissions={permissions}
        images={images.filter(
          (img) =>
            img.imageType !== imageTypes.plate &&
            img.imageType !== imageTypes.hidden
        )}
        onImageUpdate={onImageUpdate}
        activeInfraction={activeInfraction}
        activeImageViewer={activeImageViewer}
        activeImage={activeImage}
        onActiveImage={onActiveImage}
      />
    </div>
  );
};

export default Infraction;
