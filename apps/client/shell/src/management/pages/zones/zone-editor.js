import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import keys from '../../../languages/keys';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

const ZoneEditor = ({
  zone = {},
  open = false,
  handleClose,
  onZoneUpdate,
  zoneCategoriesList,
  zoneCitiesList,
  activeZoneEditor,
}) => {
  const [zoneNumber, setZoneNumber] = useState('');
  const [zoneAddress, setZoneAddress] = useState('');
  const [zoneCity, setZoneCity] = useState('');
  const [zoneCategory, setZoneCategory] = useState('');
  const [pairingTimeLimit, setPairingTimeLimit] = useState('');
  const [arrivalGraceTime, setArrivalGraceTime] = useState('');
  const [departureGraceTime, setDepartureGraceTime] = useState('');
  const intl = useIntl();

  useEffect(() => {
    if (zone !== {}) {
      setZoneNumber(zone.zone);
      setZoneAddress(zone.address);
      setZoneCity(zone.city ? zone.city.city : '');
      setZoneCategory(zone.zoneCategory ? zone.zoneCategory.name : '');
      setPairingTimeLimit(zone.pairingTimeLimit);
      setArrivalGraceTime(zone.arrivalGraceTime);
      setDepartureGraceTime(zone.departureGraceTime);
    }
  }, [zone, activeZoneEditor]);

  useEffect(() => {
    if (zone !== {} && zone.zoneCategory) {
      const initialZoneCategory = zoneCategoriesList.find(
        (cat) => cat.name === zone.zoneCategory.name
      );
      setZoneCategory(initialZoneCategory);
    }
    if (zone !== {} && zone.city) {
      const initialZoneCity = zoneCitiesList.find(
        (city) => city.city === zone.city.city
      );
      setZoneCity(initialZoneCity);
    }
  }, [zone, zoneCategoriesList, zoneCitiesList, activeZoneEditor]);

  const updateZone = () => {
    onZoneUpdate({
      ...zone,
      zone: zoneNumber,
      address: zoneAddress,
      city: zoneCity,
      zoneCategory,
      pairingTimeLimit,
      arrivalGraceTime,
      departureGraceTime,
    });
  };

  const handleSelectChange = (e) => {
    const zoneCategoryObj = zoneCategoriesList.find(
      (cat) => cat.name === e.target.value
    );
    setZoneCategory(zoneCategoryObj);
  };

  const handleSelectCityChange = (e) => {
    const zoneCityObj = zoneCitiesList.find(
      (city) => city.city === e.target.value
    );
    setZoneCity(zoneCityObj);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {intl.formatMessage({ id: keys.zoneEditorTitle })}
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label={intl.formatMessage({ id: keys.zone })}
          type="text"
          inputProps={{ readOnly: true }}
          fullWidth
          value={zoneNumber}
        />
        <TextField
          margin="dense"
          label={intl.formatMessage({ id: keys.zoneAddressTitle })}
          fullWidth
          value={zoneAddress}
          onChange={(e) => setZoneAddress(e.currentTarget.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="zoneCity">
            {intl.formatMessage({ id: keys.zoneCityTitle })}
          </InputLabel>
          <Select
            labelId="zoneCity"
            fullWidth
            onChange={(e) => handleSelectCityChange(e)}
            value={zoneCity ? zoneCity.city : ''}
          >
            {zoneCitiesList.map((i, index) => (
              <MenuItem key={index} value={i.city}>
                {i.city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="zoneCategory">
            {intl.formatMessage({ id: keys.zoneCategoryTitle })}
          </InputLabel>
          <Select
            labelId="zoneCategory"
            fullWidth
            onChange={(e) => handleSelectChange(e)}
            value={zoneCategory ? zoneCategory.name : ''}
          >
            {zoneCategoriesList.map((i, index) => (
              <MenuItem key={index} value={i.name}>
                {i.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          label={`${intl.formatMessage({
            id: keys.pairingTimeLimitTitle,
          })} (${intl.formatMessage({ id: keys.hoursTitle })})`}
          type="number"
          inputProps={{ min: 0 }}
          fullWidth
          value={pairingTimeLimit}
          onChange={(e) =>
            e.currentTarget.value < 0
              ? setPairingTimeLimit(0)
              : setPairingTimeLimit(e.currentTarget.value)
          }
        />
        <TextField
          margin="dense"
          label={`${intl.formatMessage({
            id: keys.arrivalGraceTimeTitle,
          })} (${intl.formatMessage({ id: keys.minutesTitle })})`}
          type="number"
          inputProps={{ min: 0 }}
          value={arrivalGraceTime}
          onChange={(e) =>
            e.currentTarget.value < 0
              ? setArrivalGraceTime(0)
              : setArrivalGraceTime(e.currentTarget.value)
          }
          fullWidth
        />
        <TextField
          margin="dense"
          label={`${intl.formatMessage({
            id: keys.departureGraceTimeTitle,
          })} (${intl.formatMessage({ id: keys.minutesTitle })})`}
          type="number"
          inputProps={{ min: 0 }}
          fullWidth
          value={departureGraceTime}
          onChange={(e) =>
            e.currentTarget.value < 0
              ? setDepartureGraceTime(0)
              : setDepartureGraceTime(e.currentTarget.value)
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {intl.formatMessage({ id: keys.cancelTitle })}
        </Button>
        <Button onClick={updateZone} color="primary">
          {intl.formatMessage({ id: keys.saveTitle })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ZoneEditor;
