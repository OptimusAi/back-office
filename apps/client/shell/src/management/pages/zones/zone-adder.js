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

const ZoneAdder = ({
  open = false,
  handleClose,
  onZoneAdd,
  zoneCategoriesList,
  zoneCitiesList,
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
    setZoneNumber('');
    setZoneAddress('');
    setZoneCity('');
    setZoneCategory('');
    setPairingTimeLimit('');
    setArrivalGraceTime('');
    setDepartureGraceTime('');
  }, [open]);

  const addZone = () => {
    onZoneAdd({
      zone: zoneNumber,
      address: zoneAddress,
      cityId: zoneCity.id,
      zoneCategoryId: zoneCategory.id,
      pairingTimeLimit,
      arrivalGraceTime,
      departureGraceTime,
      countrySubdivision: zoneCity.countrySubdivision,
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

  const onCloseDialog = (event, reason) => {
    if (reason === 'backdropClick') {
      return;
    }
    setZoneNumber('');
    setZoneAddress('');
    setZoneCity('');
    setZoneCategory('');
    setPairingTimeLimit('');
    setArrivalGraceTime('');
    setDepartureGraceTime('');
    handleClose();
  };

  return (
    <Dialog open={open} onClose={onCloseDialog}>
      <DialogTitle>
        {intl.formatMessage({ id: keys.zoneAdderTitle })}
      </DialogTitle>
      <DialogContent>
        <TextField
          required
          margin="dense"
          label={intl.formatMessage({ id: keys.zone })}
          fullWidth
          value={zoneNumber}
          onChange={(e) => setZoneNumber(e.currentTarget.value)}
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
        <FormControl fullWidth required>
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
          required
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
          required
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
          required
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
        <Button onClick={onCloseDialog} color="primary">
          {intl.formatMessage({ id: keys.cancelTitle })}
        </Button>
        <Button
          onClick={addZone}
          color="primary"
          //  disabled={zoneNumber.length === 0 || zoneCategory.length === 0 || pairingTimeLimit.length === 0 || arrivalGraceTime.length === 0 || departureGraceTime.length === 0}
        >
          {intl.formatMessage({ id: keys.saveTitle })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ZoneAdder;
