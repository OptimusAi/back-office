import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import keys from '../../../languages/keys';

const ZoneCategoriesDialog = ({
  onDelete,
  closeDialog,
  activeZoneCategory,
}) => {
  return (
    <Dialog
      open
      onClose={closeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <FormattedMessage id={keys.deleteZoneCategoryTitle} />
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <FormattedMessage
            id={keys.deleteZoneCategoryDialog}
            values={{ zoneCategory: activeZoneCategory.name }}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          <FormattedMessage id={keys.cancelTitle} />
        </Button>
        <Button
          onClick={() => onDelete(activeZoneCategory.id)}
          color="primary"
          autoFocus
        >
          <FormattedMessage id={keys.sendToEnforceConfirm} />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ZoneCategoriesDialog;
