import React from 'react';
import { useIntl } from 'react-intl';
import keys from '../../../languages/keys';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

const BylawAdder = ({
  open = false,
  handleClose,
  onBylawAdd,
  newBylaw,
  onNewBylawUpdate,
}) => {
  const intl = useIntl();

  const addBylaw = () => {
    onBylawAdd({
      ...newBylaw,
    });
  };

  const handleBylawCodeUpdate = (bylawCode) => {
    onNewBylawUpdate({
      code: bylawCode,
      sectionCode: newBylaw !== null ? newBylaw.sectionCode : '',
      description: newBylaw !== null ? newBylaw.description : '',
    });
  };

  const handleBylawSectionCodeUpdate = (bylawSectionCode) => {
    onNewBylawUpdate({
      code: newBylaw !== null ? newBylaw.code : '',
      sectionCode: bylawSectionCode,
      description: newBylaw !== null ? newBylaw.description : '',
    });
  };

  const handleBylawDescriptionUpdate = (bylawDescription) => {
    onNewBylawUpdate({
      code: newBylaw !== null ? newBylaw.code : '',
      sectionCode: newBylaw !== null ? newBylaw.sectionCode : '',
      description: bylawDescription,
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {intl.formatMessage({ id: keys.bylawAdderTitle })}
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label={intl.formatMessage({ id: keys.bylawCodeTitle })}
          fullWidth
          value={newBylaw !== null ? newBylaw.code : ''}
          onChange={(e) => handleBylawCodeUpdate(e.currentTarget.value)}
          error={
            newBylaw !== null &&
            newBylaw.code !== '' &&
            newBylaw.code.length < 2
          }
          helperText={
            newBylaw !== null &&
            newBylaw.code !== '' &&
            newBylaw.code.length < 2
              ? intl.formatMessage({ id: 'bylawFieldErrorMessage' })
              : ''
          }
        />
        <TextField
          margin="dense"
          label={intl.formatMessage({ id: keys.bylawSectionCodeTitle })}
          fullWidth
          value={newBylaw !== null ? newBylaw.sectionCode : ''}
          onChange={(e) => handleBylawSectionCodeUpdate(e.currentTarget.value)}
          error={
            newBylaw !== null &&
            newBylaw.sectionCode !== '' &&
            newBylaw.sectionCode.length < 2
          }
          helperText={
            newBylaw !== null &&
            newBylaw.sectionCode !== '' &&
            newBylaw.sectionCode.length < 2
              ? intl.formatMessage({ id: 'bylawFieldErrorMessage' })
              : ''
          }
        />
        <TextField
          margin="dense"
          label={intl.formatMessage({ id: keys.bylawDescriptionTitle })}
          fullWidth
          value={newBylaw !== null ? newBylaw.description : ''}
          onChange={(e) => handleBylawDescriptionUpdate(e.currentTarget.value)}
          error={
            newBylaw !== null &&
            newBylaw.description !== '' &&
            newBylaw.description.length < 2
          }
          helperText={
            newBylaw !== null &&
            newBylaw.description !== '' &&
            newBylaw.description.length < 2
              ? intl.formatMessage({ id: 'bylawFieldErrorMessage' })
              : ''
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {intl.formatMessage({ id: keys.cancelTitle })}
        </Button>
        <Button onClick={addBylaw} color="primary">
          {intl.formatMessage({ id: keys.saveTitle })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BylawAdder;
