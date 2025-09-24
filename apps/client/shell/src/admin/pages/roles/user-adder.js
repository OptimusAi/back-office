import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import keys from '../../../languages/keys';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const UserAdder = ({ open = false, handleClose, users, onUpdateRole }) => {
  const intl = useIntl();
  const [selectedUser, setSelectedUser] = useState(null);
  const [hasError, setHasError] = useState(false);

  const addUser = () => {
    if (selectedUser !== null) {
      onUpdateRole(selectedUser.id);
      setSelectedUser(null);
    } else {
      setHasError(true);
    }
  };

  const onClose = () => {
    handleClose();
    setSelectedUser(null);
    setHasError(false);
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>
        {intl.formatMessage({ id: keys.userAdderTitle })}
      </DialogTitle>
      <DialogContent>
        <Autocomplete
          fullWidth
          value={selectedUser}
          margin="dense"
          id="usersList"
          disableClearable
          onChange={(e, newValue) => setSelectedUser(newValue)}
          options={users.filter((u) => u.parkPlusUserId !== null)}
          getOptionLabel={(option) => option.emailAddress ?? null}
          getOptionSelected={(option, value) => option.id === value.id}
          style={{ width: 500 }}
          renderInput={(params) => (
            <TextField
              {...params}
              error={hasError}
              helperText={
                hasError
                  ? intl.formatMessage({
                      id: keys.userNotSelected,
                    })
                  : ''
              }
              label={intl.formatMessage({
                id: keys.users,
              })}
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {intl.formatMessage({ id: keys.cancelTitle })}
        </Button>
        <Button onClick={addUser} color="primary">
          {intl.formatMessage({ id: keys.saveTitle })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserAdder;
