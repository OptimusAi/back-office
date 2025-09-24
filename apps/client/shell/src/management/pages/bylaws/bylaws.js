/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { makeStyles } from '@material-ui/styles';
import { DataGrid, frFR, enUS } from '@mui/x-data-grid';
import { Button, IconButton, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import keys from '../../../languages/keys';
import { mapBylawRows } from '../../management.mappers';
import BylawEditor from './bylaw.editor';
import AddIcon from '@material-ui/icons/Add';
import BylawAdder from './bylaw.adder';
import { roleTypes } from '../../../admin/admin.enums';
import BylawDialog from './bylaw-dialog';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
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
}));

const Bylaws = ({
  bylaws,
  onBylawsRequest,
  onSelectedBylaw,
  activeBylaw,
  onBylawUpdate,
  onBylawAdd,
  activeBylawEditor,
  activeBylawAdder,
  onEdit,
  onAdd,
  onDelete,
  newBylaw,
  onNewBylawUpdate,
  permissions,
  fetchedBylaws,
}) => {
  const classes = useStyles();
  const intl = useIntl();
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  let isReadOnly = !permissions.includes(roleTypes[0]);

  useEffect(() => {
    // look for a workaround to export column array
    setColumns([
      {
        field: 'bylawCode',
        headerName: intl.formatMessage({ id: keys.bylawCodeTitle }),
        flex: 1.5,
        editable: false,
      },
      {
        field: 'sectionCode',
        headerName: intl.formatMessage({ id: keys.bylawSectionCodeTitle }),
        flex: 1.5,
        editable: false,
      },
      {
        field: 'description',
        headerName: intl.formatMessage({ id: keys.descriptionTitle }),
        flex: 1.5,
        editable: false,
      },
      {
        field: 'edit',
        headerName: intl.formatMessage({ id: keys.editTitle }),
        flex: 1,
        renderCell: renderActionButton,
        sortable: false,
        editable: false,
        filterable: false,
      },
      {
        field: 'delete',
        headerName: intl.formatMessage({ id: keys.deleteTitle }),
        flex: 1,
        renderCell: (e) => renderDeleteButton(e.id),
        sortable: false,
        editable: false,
        filterable: false,
      },
    ]);
  }, [intl]);

  useEffect(() => {
    if (!fetchedBylaws) {
      onBylawsRequest();
    }
  }, [onBylawsRequest, fetchedBylaws]);

  useEffect(() => {
    if (bylaws !== []) {
      setRows(mapBylawRows(bylaws));
    }
  }, [bylaws]);

  useEffect(() => {
    isReadOnly = !permissions.includes(roleTypes[0]);
  }, [permissions]);

  const renderActionButton = () => {
    return (
      <IconButton disabled={isReadOnly} onClick={() => handleBylawEditor()}>
        <EditIcon />
      </IconButton>
    );
  };

  const renderDeleteButton = () => {
    return (
      <IconButton onClick={() => setIsOpen(true)} disabled={isReadOnly}>
        <DeleteIcon />
      </IconButton>
    );
  };

  const handleBylawEditor = () => {
    onEdit(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'backdropClick') {
      return;
    }
    onEdit(false);
    onAdd(false);
    onNewBylawUpdate(null);
  };

  const handleBylawAdder = () => {
    onAdd(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <div className={classes.container}>
      <div className={classes.gridToolbar}>
        <Typography variant="h5">{intl.formatMessage({ id: keys.bylawTitle })}</Typography>
        <Button
          disabled={isReadOnly}
          onClick={() => handleBylawAdder()}
          startIcon={<AddIcon />}
          variant="contained"
          color="primary"
        >
          {intl.formatMessage({ id: keys.bylawAdderTitle })}
        </Button>
      </div>
      <div className={classes.gridContainer}>
        <DataGrid
          rows={rows}
          columns={columns}
          onCellClick={(e) => onSelectedBylaw(e.id)}
          localeText={navigator.language === 'fr' ? frFR.components.MuiDataGrid.defaultProps.localeText : enUS.components.MuiDataGrid.defaultProps.localeText}
        />
        <BylawEditor
          activeBylaw={activeBylaw}
          open={activeBylawEditor}
          handleClose={handleClose}
          onBylawUpdate={!isReadOnly ? onBylawUpdate : () => {}}
          activeBylawEditor={activeBylawEditor}
        />
        <BylawAdder
          open={activeBylawAdder}
          handleClose={handleClose}
          onBylawAdd={!isReadOnly ? onBylawAdd : () => {}}
          activeBylawAdder={activeBylawAdder}
          newBylaw={newBylaw}
          onNewBylawUpdate={!isReadOnly ? onNewBylawUpdate : () => {}}
        />
        {isOpen && (
          <BylawDialog
            activeBylaw={activeBylaw}
            closeDialog={closeDialog}
            onDelete={onDelete}
          />
        )}
      </div>
    </div>
  );
};

export default Bylaws;
