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

const ZoneCategoriesAdder = ({
  open = false,
  handleClose,
  onZoneCategoryAdd,
  bylawsList,
}) => {
  const intl = useIntl();
  const [zoneCategoryName, setZoneCategoryName] = useState('');
  const [zoneCategoryDescription, setZoneCategoryDescription] = useState('');
  const [selectedBylaws, setSelectedBylaws] = useState([]);

  useEffect(() => {
    setZoneCategoryName('');
    setZoneCategoryDescription('');
    setSelectedBylaws([]);
  }, [open]);

  const addZoneCategory = () => {
    onZoneCategoryAdd({
      name: zoneCategoryName,
      description: zoneCategoryDescription,
      bylaws: selectedBylaws.map((b) => b.id),
    });
  };

  const onCloseDialog = (event, reason) => {
    if (reason === 'backdropClick') {
      return;
    }
    setZoneCategoryName('');
    setZoneCategoryDescription('');
    setSelectedBylaws([]);
    handleClose();
  };

  const handleBylawRemove = (e, option) => {
    const newSelectedBylaws = selectedBylaws.filter((b) => b !== option);
    return setSelectedBylaws(newSelectedBylaws);
  };

  const handleBylawSelection = (e, bylaw) => {
    if (bylaw.length !== 0) {
      const bylawFromList = bylawsList.find(
        (i) => i.id === bylaw[bylaw.length - 1].id
      );
      const newSelectedBylaws = [
        ...new Set(
          bylawFromList
            ? [...selectedBylaws, bylawFromList]
            : [...selectedBylaws]
        ),
      ];

      setSelectedBylaws(newSelectedBylaws);
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
        {intl.formatMessage({ id: keys.zoneCategoryAdderTitle })}
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
          getOptionLabel={(option) => option.sectionCode}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseDialog} color="primary">
          {intl.formatMessage({ id: keys.cancelTitle })}
        </Button>
        <Button
          onClick={addZoneCategory}
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

export default ZoneCategoriesAdder;
