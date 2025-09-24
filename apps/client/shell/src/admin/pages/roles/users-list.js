/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { makeStyles } from '@material-ui/styles';
import { DataGrid, frFR, enUS } from '@mui/x-data-grid';
import keys from '../../../languages/keys';
import { Typography, Button, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import UserAdder from './user-adder';
import { roleTypes } from '../../admin.enums';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    width: '100%',
    paddingTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  gridToolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: theme.spacing(2),
  },
  gridContainer: {
    flexGrow: 1,
  },
  noActiveRole: {
    visibility: 'hidden',
  },
}));

const UsersList = ({
  users,
  filteredUsers,
  activeRole,
  activeUserAdder,
  onUpdateRole,
  onActiveUserAdder,
  onUserRoleRemove,
}) => {
  const classes = useStyles();
  const intl = useIntl();
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  const renderDeleteButton = (id) => {
    return (
      <IconButton onClick={() => onUserRoleRemove(id)}>
        <DeleteIcon />
      </IconButton>
    );
  };

  useEffect(() => {
    setColumns([
      {
        field: 'emailAddress',
        headerName: intl.formatMessage({ id: keys.email }),
        flex: 1.5,
        editable: false,
      },
      {
        field: 'delete',
        headerName: intl.formatMessage({ id: keys.deleteTitle }),
        flex: 0.5,
        renderCell: (e) => renderDeleteButton(e.id),
        sortable: false,
        editable: false,
        filterable: false,
      },
    ]);
  }, [intl]);

  useEffect(() => {
    if (filteredUsers !== []) {
      setRows(filteredUsers);
    }
  }, [filteredUsers]);

  const handleClose = (event, reason) => {
    if (reason === 'backdropClick') {
      return;
    }
    onActiveUserAdder(false);
  };

  return (
    <div className={classes.container}>
      <div className={classes.gridToolbar}>
        {activeRole === null && (
          <Typography variant="h5" className={classes.noActiveRole}>
            {intl.formatMessage({ id: keys.adminTitle })}
          </Typography>
        )}
        <Typography variant="h5">
          {activeRole === 0 && intl.formatMessage({ id: keys.adminTitle })}
          {activeRole === 1 &&
            intl.formatMessage({ id: keys.enforcementTitle })}
          {activeRole === 2 &&
            intl.formatMessage({ id: keys.verificationTitle })}
          {activeRole !== null && intl.formatMessage({ id: keys.users })}
        </Typography>
        {activeRole !== null && (
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="primary"
            onClick={() => onActiveUserAdder(true)}
          >
            {intl.formatMessage({ id: keys.userAdderTitle })}
          </Button>
        )}
      </div>
      <div className={classes.gridContainer}>
        <DataGrid
          disableSelectionOnClick
          rows={rows}
          columns={columns}
          localeText={
            navigator.language === 'fr'
              ? frFR.components.MuiDataGrid.defaultProps.localeText
              : enUS.components.MuiDataGrid.defaultProps.localeText
          }
        />
        <UserAdder
          open={activeUserAdder}
          handleClose={handleClose}
          users={users.filter(
            (user) => !user.authorities.includes(roleTypes[activeRole])
          )}
          onUpdateRole={onUpdateRole}
        />
      </div>
    </div>
  );
};

export default UsersList;
