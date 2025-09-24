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
} from '@material-ui/core';

const BylawEditor = ({
  activeBylaw = {},
  open = false,
  handleClose,
  onBylawUpdate,
  activeBylawEditor,
}) => {
  const intl = useIntl();

  const [bylawCode, setBylawCode] = useState('');
  const [sectionCode, setSectionCode] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (activeBylaw !== {}) {
      setBylawCode(activeBylaw.code);
      setSectionCode(activeBylaw.sectionCode);
      setDescription(activeBylaw.description);
    }
  }, [activeBylaw, activeBylawEditor]);

  const updateZoneCategory = () => {
    onBylawUpdate({
      ...activeBylaw,
      code: bylawCode,
      sectionCode,
      description,
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {intl.formatMessage({ id: keys.bylawEditorTitle })}
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label={intl.formatMessage({ id: keys.bylawCodeTitle })}
          fullWidth
          value={bylawCode}
          onChange={(e) => setBylawCode(e.currentTarget.value)}
          error={(bylawCode && bylawCode.length < 2) || bylawCode === ''}
          helperText={
            (bylawCode && bylawCode.length < 2) || bylawCode === ''
              ? intl.formatMessage({ id: 'bylawFieldErrorMessage' })
              : ''
          }
        />
        <TextField
          margin="dense"
          label={intl.formatMessage({ id: keys.bylawSectionCodeTitle })}
          fullWidth
          value={sectionCode}
          onChange={(e) => setSectionCode(e.currentTarget.value)}
          error={(sectionCode && sectionCode.length < 2) || sectionCode === ''}
          helperText={
            (sectionCode && sectionCode.length < 2) || sectionCode === ''
              ? intl.formatMessage({ id: 'bylawFieldErrorMessage' })
              : ''
          }
        />
        <TextField
          margin="dense"
          label={intl.formatMessage({ id: keys.bylawDescriptionTitle })}
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          error={(description && description.length < 2) || description === ''}
          helperText={
            (description && description.length < 2) || description === ''
              ? intl.formatMessage({ id: 'bylawFieldErrorMessage' })
              : ''
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {intl.formatMessage({ id: keys.cancelTitle })}
        </Button>
        <Button onClick={updateZoneCategory} color="primary">
          {intl.formatMessage({ id: keys.saveTitle })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BylawEditor;
