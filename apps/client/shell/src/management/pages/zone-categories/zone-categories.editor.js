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
  Checkbox,
  Chip,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const ZoneCategoriesEditor = ({
  activeZoneCategory,
  open = false,
  handleClose,
  onZoneCategoryUpdate,
  bylawsList,
  onAssociatedBylawsRequest,
  onAddBylawAssociations,
  onRemoveBylawAssociations,
  activeZoneCategoryBylaws,
  defaultBylaw,
  onSelectDefaultBylaw,
}) => {
  const intl = useIntl();
  const [zoneCategoryName, setZoneCategoryName] = useState('');
  const [zoneCategoryDescription, setZoneCategoryDescription] = useState('');
  const [selectedBylaws, setSelectedBylaws] = useState([]);
  const [removedBylaws, setRemovedBylaws] = useState([]);
  const [newBylaws, setNewBylaws] = useState([]);
  const [previousDefaultBylaw, setPreviousDefaultBylaw] = useState();
  const [arrivalGraceTime, setArrivalGraceTime] = useState('');
  const [departureGraceTime, setDepartureGraceTime] = useState('');

  useEffect(() => {
    if (activeZoneCategory !== undefined) {
      setZoneCategoryName(activeZoneCategory.name);
      setZoneCategoryDescription(activeZoneCategory.description);
      setArrivalGraceTime(activeZoneCategory.arrivalGraceTime);
      setDepartureGraceTime(activeZoneCategory.departureGraceTime)
      if (open && activeZoneCategoryBylaws === null) {
        onAssociatedBylawsRequest();
      }
      setRemovedBylaws([]);
      setNewBylaws([]);
    }
  }, [
    activeZoneCategory,
    onAssociatedBylawsRequest,
    activeZoneCategoryBylaws,
    open,
  ]);

  useEffect(() => {
    if (activeZoneCategoryBylaws !== null) {
      const bylaws = activeZoneCategoryBylaws.map((b) => b.bylaw);
      const defaultBylaw = activeZoneCategoryBylaws.find((b) => b.defaultBylaw);
      setSelectedBylaws(bylaws);
      setPreviousDefaultBylaw(
        defaultBylaw === undefined ? null : defaultBylaw.bylaw
      );
    }
  }, [activeZoneCategoryBylaws]);

  const updateZoneCategory = () => {
    if (
      activeZoneCategory.name !== zoneCategoryName ||
      activeZoneCategory.description !== zoneCategoryDescription ||
      activeZoneCategory.arrivalGraceTime !== arrivalGraceTime ||
      activeZoneCategory.departureGraceTime !== departureGraceTime
    ) {
      onZoneCategoryUpdate({
        name: zoneCategoryName,
        description: zoneCategoryDescription,
        newBylaws: newBylaws.map((b) => b.id),
        removedBylaws: removedBylaws.map((b) => b.id),
        defaultBylawId: defaultBylaw === null ? null : defaultBylaw.id,
        arrivalGraceTime: Number(arrivalGraceTime),
        departureGraceTime: Number(departureGraceTime), 
      });
    } else if (
      newBylaws.length !== 0 ||
      (defaultBylaw === null && previousDefaultBylaw !== null) ||
      (defaultBylaw !== null &&
        (previousDefaultBylaw === null ||
          defaultBylaw.id !== previousDefaultBylaw.id))
    ) {
      onAddBylawAssociations({
        newBylaws: newBylaws.map((b) => b.id),
        removedBylaws: removedBylaws.map((b) => b.id),
        defaultBylawId: defaultBylaw === null ? null : defaultBylaw.id,
      });
    } else if (removedBylaws.length !== 0) {
      onRemoveBylawAssociations({
        bylawsIds: removedBylaws.map((b) => b.id),
      });
    } else onCloseDialog();
  };

  const onCloseDialog = (event, reason) => {
    if (reason === 'backdropClick') {
      return;
    }
    setZoneCategoryName('');
    setZoneCategoryDescription('');
    setSelectedBylaws([]);
    setArrivalGraceTime(0);
    setDepartureGraceTime(0);
    setRemovedBylaws([]);
    setNewBylaws([]);
    setPreviousDefaultBylaw();
    handleClose();
  };

  const handleBylawRemove = (e, bylaw) => {
    let mappedZoneCategoryBylaws = [];
    if (activeZoneCategoryBylaws !== null) {
      mappedZoneCategoryBylaws = activeZoneCategoryBylaws.map((i) => i.bylaw);
    }
    const bylawFromList = bylawsList.find((i) => i.id === bylaw.id);
    const bylawIsPreviouslyAssociated = mappedZoneCategoryBylaws.find(
      (i) => i.id === bylaw.id
    );

    if (bylawIsPreviouslyAssociated) {
      setRemovedBylaws([...removedBylaws, bylawFromList]);
    }
    const newSelectedBylaws = selectedBylaws.filter((b) => b !== bylaw);
    return setSelectedBylaws(newSelectedBylaws);
  };

  const handleBylawSelection = (e, bylaw) => {
    let mappedZoneCategoryBylaws = [];
    if (activeZoneCategoryBylaws !== null) {
      mappedZoneCategoryBylaws = activeZoneCategoryBylaws.map((i) => i.bylaw);
    }
    const bylawFromList = bylawsList.find(
      (i) => i.id === bylaw[bylaw.length - 1].id
    );
    const bylawIsPreviouslyAssociated = mappedZoneCategoryBylaws.find(
      (i) => i.id === bylawFromList.id
    );
    const bylawIsPreviouslySelected = selectedBylaws.find(
      (i) => i.id === bylawFromList.id
    );

    if (!bylawIsPreviouslyAssociated) {
      setNewBylaws([...newBylaws, bylawFromList]);
    }
    if (!bylawIsPreviouslySelected) {
      setSelectedBylaws([...selectedBylaws, bylawFromList]);
    }
  };

  const handleCheckedBylaws = (e, option) => {
    if (!e.target.checked) {
      const newSelectedBylaws = selectedBylaws.filter(
        (b) => b.id !== option.id
      );
      return setSelectedBylaws(newSelectedBylaws);
    }
  };

  return (
    <Dialog open={open} onClose={onCloseDialog}>
      <DialogTitle>
        {intl.formatMessage({ id: keys.zoneCategoryEditorTitle })}
      </DialogTitle>
      <DialogContent>
        <TextField
          label={intl.formatMessage({ id: keys.zoneCategoryNameTitle })}
          fullWidth
          margin="dense"
          onChange={(e) => setZoneCategoryName(e.currentTarget.value)}
          value={zoneCategoryName}
        />
        <TextField
          label={intl.formatMessage({
            id: keys.zoneCategoryDescriptionTitle,
          })}
          fullWidth
          margin="dense"
          onChange={(e) => setZoneCategoryDescription(e.currentTarget.value)}
          value={zoneCategoryDescription}
        />
        <Autocomplete
          disableClearable
          margin="dense"
          multiple
          id="associated-bylaws"
          value={selectedBylaws}
          onChange={handleBylawSelection}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option.sectionCode}
                {...getTagProps({ index })}
                onDelete={(e) => handleBylawRemove(e, option)}
              />
            ))
          }
          options={bylawsList}
          disableCloseOnSelect
          getOptionLabel={(option) => option.sectionCode ?? ''}
          getOptionSelected={(option, value) => option.id === value.id}
          renderOption={(option, { selected }) => (
            <>
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                style={{ marginRight: 8 }}
                checked={selected}
                onChange={(e) => handleCheckedBylaws(e, option)}
              />
              {option.sectionCode}
            </>
          )}
          style={{ width: 500 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={intl.formatMessage({
                id: keys.zoneCategoryEditorBylawsTitle,
              })}
            />
          )}
        />
        <Autocomplete
          value={selectedBylaws.includes(defaultBylaw) ? defaultBylaw : ''}
          margin="dense"
          id="associated-bylaws"
          onChange={(event, newValue) => {
            onSelectDefaultBylaw(newValue);
          }}
          options={selectedBylaws}
          getOptionLabel={(option) => option.sectionCode ?? ''}
          getOptionSelected={(option, value) => option.id === value.id}
          style={{ width: 500 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={intl.formatMessage({
                id: keys.defaultBylawTitle,
              })}
            />
          )}
        />

        <TextField
          margin="dense"
          fullWidth
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
        />

        <TextField
          margin="dense"
          fullWidth
          label={`${intl.formatMessage({
            id: keys.departureGraceTimeTitle,
          })} (${intl.formatMessage({ id: keys.minutesTitle })})`}
          type="number"
          inputProps={{ min: 0 }}
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
          onClick={updateZoneCategory}
          color="primary"
          disabled={
            selectedBylaws.length === 0 ||
            zoneCategoryName === '' ||
            zoneCategoryDescription === ''
          }
        >
          {intl.formatMessage({ id: keys.saveTitle })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ZoneCategoriesEditor;
