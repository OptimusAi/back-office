/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { FormControl, makeStyles, TextField, Divider } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { observationTypes } from '../../../../enforcement.enums';
import keys from '../../../../../languages/keys';
import { roleTypes } from '../../../../../admin/admin.enums';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '11rem 13rem 1fr 1fr',
    padding: theme.spacing(),
  },
  licencePlateImage: {
    objectFit: 'contain',
    maxWidth: '100%',
    maxHeight: '100%',
    width: '100%',
  },
  field: {
    marginBottom: theme.spacing(),
  },
  firstColumn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: theme.spacing(),
  },
  secondColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: theme.spacing(),
  },
  thirdColumn: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(),
  },
  dinamicFields: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
  },
  divider: {
    marginLeft: theme.spacing(),
  },
}));

const InfractionDetails = ({
  activeInfraction,
  originalActiveInfraction,
  licencePlateImage,
  handleLicencePlateUpdate,
  handleZoneUpdate,
  regions,
  zones,
  onInfractionUpdate,
  onEditing,
  permissions,
}) => {
  const classes = useStyles();

  const [initialRegion, setInitialRegion] = useState(
    originalActiveInfraction
      ? originalActiveInfraction.licencePlate.countrySubdivision
      : ''
  );
  const [initialZone, setInitialZone] = useState(
    originalActiveInfraction ? originalActiveInfraction.zone : ''
  );

  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [hasSelected, setHasSelected] = useState(false);
  const intl = useIntl();
  const [entryObservation, setEntryObservation] = useState(null);
  const [exitObservation, setExitObservation] = useState(null);
  const [realTimeObservation, setRealTimeObservation] = useState(null);
  const isAdminOrEnforcement =
    permissions.includes(roleTypes[0]) || permissions.includes(roleTypes[1]);

  useEffect(() => {
    setEntryObservation(
      activeInfraction.observations.find(
        (o) => o.eventType === observationTypes.entry
      ) || null
    );
    setExitObservation(
      activeInfraction.observations.find(
        (o) => o.eventType === observationTypes.exit
      ) || null
    );
    setRealTimeObservation(
      activeInfraction.observations.find(
        (o) => o.eventType === observationTypes.realtime
      ) || null
    );
  }, [activeInfraction]);

  useEffect(() => {
    if (activeInfraction !== {}) {
      const initialRegion = regions.find(
        (region) =>
          region.code === activeInfraction.licencePlate.countrySubdivision.code
      );
      const initialZone = zones.find((z) => z.zone === activeInfraction.zone);
      setSelectedRegion(initialRegion);
      setSelectedZone(initialZone);
    }
  }, [activeInfraction, regions, zones]);

  const handleLicencePlateNumberChange = (e) => {
    const licencePlateObj = {
      licencePlateNumber: e.currentTarget.value || '',
      countrySubdivision: {
        ...activeInfraction.licencePlate.countrySubdivision,
      },
    };
    handleLicencePlateUpdate(licencePlateObj);
  };

  const handleRegionChange = (e, newValue) => {
    const regionObj = regions.find((region) => region.name === newValue.name);
    setSelectedRegion(regionObj);
    const licencePlateObj = {
      licencePlateNumber: activeInfraction.licencePlate.licencePlateNumber,
      countrySubdivision: {
        ...activeInfraction.licencePlate.countrySubdivision,
        ...regionObj,
      },
    };
    handleLicencePlateUpdate(licencePlateObj);
    if (
      isAdminOrEnforcement &&
      newValue !== initialRegion
    ) {
      onInfractionUpdate(activeInfraction.id);
    }
  };

  const handleRegionClose = () => {
    onEditing(false);
  };

  const handleZoneChange = (e, newValue) => {
    handleZoneUpdate(newValue.zone);
    if (isAdminOrEnforcement && newValue.zone !== initialZone) {
      onInfractionUpdate(activeInfraction.id);
    }
  };

  const handleZoneClose = () => {
    onEditing(false);
  };

  return (
    <div className={classes.container}>
      <div className={classes.licencePlateImageContainer}>
        <img
          className={classes.licencePlateImage}
          src={licencePlateImage.src}
          alt=""
        />
      </div>
      <div className={classes.firstColumn}>
        <TextField
          id="prevent-outside-tab"
          inputRef={(input) => {
            if (input != null && !hasSelected) {
              input.focus();
              setHasSelected(true);
            }
          }}
          fullWidth
          inputProps={{ style: { fontSize: 30 } }}
          label={intl.formatMessage({ id: keys.licencePlate })}
          value={activeInfraction.licencePlate.licencePlateNumber}
          error={activeInfraction.licencePlate.licencePlateNumber === ''}
          helperText={
            activeInfraction.licencePlate.licencePlateNumber === ''
              ? intl.formatMessage({ id: 'licencePlateBlankErrorMessage' })
              : ' '
          }
          onChange={(e) => handleLicencePlateNumberChange(e)}
          onFocus={() => onEditing(true)}
          onBlur={() => {
            onEditing(false);
            return activeInfraction.licencePlate.licencePlateNumber !==
              originalActiveInfraction.licencePlate.licencePlateNumber &&
              isAdminOrEnforcement
              ? onInfractionUpdate(activeInfraction.id)
              : () => {};
          }}
        />
        <Divider orientation="vertical" className={classes.divider} />
      </div>
      <div className={classes.secondColumn}>
        <FormControl fullWidth className={classes.field}>
          <Autocomplete
            fullWidth
            disableClearable
            selectOnFocus
            value={selectedRegion}
            margin="dense"
            id="region"
            onChange={(e, newValue) => handleRegionChange(e, newValue)}
            options={regions}
            getOptionLabel={(option) => option.name ?? null}
            getOptionSelected={(option, value) => option.name === value.name}
            onOpen={() => onEditing(true)}
            onClose={handleRegionClose}
            renderInput={({ inputProps, ...rest }) => (
              <TextField
                {...rest}
                inputProps={{ ...inputProps }}
                label={intl.formatMessage({
                  id: keys.provinceState,
                })}
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth className={classes.field}>
          <Autocomplete
            fullWidth
            disableClearable
            selectOnFocus
            value={selectedZone}
            margin="dense"
            id="zone"
            onChange={(e, newValue) => handleZoneChange(e, newValue)}
            options={zones}
            getOptionLabel={(option) =>
              option.zone
                ? `${option.zone} (${option.zoneCategory.name})`
                : null
            }
            getOptionSelected={(option, value) => option.zone === value.zone}
            onOpen={() => onEditing(true)}
            onClose={handleZoneClose}
            renderInput={({ inputProps, ...rest }) => (
              <TextField
                {...rest}
                inputProps={{ ...inputProps }}
                label={intl.formatMessage({
                  id: keys.zone,
                })}
              />
            )}
          />
        </FormControl>
        <TextField
          fullWidth
          inputProps={{
            readOnly: true,
            style: { cursor: 'default' },
            tabIndex: -1,
          }}
          label={intl.formatMessage({ id: keys.address })}
          value={
            activeInfraction.zone.address || activeInfraction.address || ''
          }
          className={classes.field}
        />
      </div>
      <div className={classes.thirdColumn}>
        <div className={classes.dinamicFields}>
          {entryObservation && (
            <TextField
              fullWidth
              inputProps={{
                readOnly: true,
                style: { cursor: 'default' },
                tabIndex: -1,
              }}
              label={intl.formatMessage({ id: keys.entryDate })}
              value={`${intl.formatDate(
                entryObservation.observedAt
              )} ${intl.formatMessage({ id: keys.at })} ${intl.formatTime(
                entryObservation.observedAt, { hour12: false }
              )}`}
              className={classes.field}
            />
          )}
          {exitObservation && (
            <TextField
              fullWidth
              inputProps={{
                readOnly: true,
                style: { cursor: 'default' },
                tabIndex: -1,
              }}
              label={intl.formatMessage({ id: keys.exitDate })}
              value={`${intl.formatDate(
                exitObservation.observedAt
              )} ${intl.formatMessage({ id: keys.at })} ${intl.formatTime(
                exitObservation.observedAt, { hour12: false }
              )}`}
              className={classes.field}
            />
          )}
          {realTimeObservation && (
            <TextField
              fullWidth
              inputProps={{
                readOnly: true,
                style: { cursor: 'default' },
                tabIndex: -1,
              }}
              label={intl.formatMessage({ id: keys.travelDirection })}
              value={realTimeObservation.dot || ''}
              className={classes.field}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InfractionDetails;
