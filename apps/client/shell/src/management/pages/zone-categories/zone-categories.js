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
import { mapZoneCategoryRows } from '../../management.mappers';
import ZoneCategoriesEditor from './zone-categories.editor';
import AddIcon from '@material-ui/icons/Add';
import ZoneCategoriesAdder from './zone-categories.adder';
import { roleTypes } from '../../../admin/admin.enums';
import ZoneCategoriesDialog from './zone-categories-dialog';

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

const ZoneCategories = ({
  zoneCategories,
  onZoneCategoriesRequest,
  onAssociatedBylawsRequest,
  onBylawsRequest,
  bylawsList,
  onSelectedZoneCategory,
  activeZoneCategory,
  defaultBylaw,
  onZoneCategoryUpdate,
  onZoneCategoryAdd,
  onAddBylawAssociations,
  onRemoveBylawAssociations,
  onEdit,
  onDelete,
  onAdd,
  onSelectDefaultBylaw,
  activeZoneCategoryId,
  activeZoneCategoryEditor,
  activeZoneCategoryAdder,
  activeZoneCategoryBylaws,
  permissions,
  fetchedZoneCategories,
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
        field: 'zoneCategory',
        headerName: intl.formatMessage({ id: keys.zoneCategoryTitle }),
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
    if (!fetchedZoneCategories) {
      onZoneCategoriesRequest();
    }
    if (!fetchedBylaws) {
      onBylawsRequest();
    }
  }, [
    onZoneCategoriesRequest,
    onBylawsRequest,
    fetchedZoneCategories,
    fetchedBylaws,
  ]);

  useEffect(() => {
    if (zoneCategories !== []) {
      setRows(mapZoneCategoryRows(zoneCategories));
    }
  }, [zoneCategories]);

  useEffect(() => {
    isReadOnly = !permissions.includes(roleTypes[0]);
  }, [permissions]);

  const renderActionButton = () => {
    return (
      <IconButton
        disabled={isReadOnly}
        onClick={() => handleZoneCategoryEditor()}
      >
        <EditIcon />
      </IconButton>
    );
  };

  const renderDeleteButton = (id) => {
    return (
      <IconButton onClick={() => setIsOpen(true)} disabled={isReadOnly}>
        <DeleteIcon />
      </IconButton>
    );
  };

  const handleZoneCategoryEditor = () => {
    onEdit(true);
  };

  const handleClose = () => {
    onEdit(false);
    onAdd(false);
  };

  const handleZoneCategoryAdder = () => {
    onAdd(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <div className={classes.container}>
      <div className={classes.gridToolbar}>
        <Typography variant="h5">
          {intl.formatMessage({ id: keys.zoneCategoriesTitle })}
        </Typography>
        <Button
          disabled={isReadOnly}
          onClick={() => handleZoneCategoryAdder()}
          startIcon={<AddIcon />}
          variant="contained"
          color="primary"
        >
          {intl.formatMessage({ id: keys.zoneCategoryAdderTitle })}
        </Button>
      </div>
      <div className={classes.gridContainer}>
        <DataGrid
          rows={rows}
          columns={columns}
          onCellClick={(e) => onSelectedZoneCategory(e.id)}
          localeText={
            navigator.language === 'fr'
              ? frFR.components.MuiDataGrid.defaultProps.localeText
              : enUS.components.MuiDataGrid.defaultProps.localeText
          }
        />
        <ZoneCategoriesEditor
          activeZoneCategory={activeZoneCategory}
          open={activeZoneCategoryEditor}
          handleClose={handleClose}
          onZoneCategoryUpdate={!isReadOnly ? onZoneCategoryUpdate : () => {}}
          bylawsList={bylawsList}
          onAssociatedBylawsRequest={
            !isReadOnly ? onAssociatedBylawsRequest : () => {}
          }
          activeZoneCategoryBylaws={activeZoneCategoryBylaws}
          onRemoveBylawAssociations={
            !isReadOnly ? onRemoveBylawAssociations : () => {}
          }
          onAddBylawAssociations={
            !isReadOnly ? onAddBylawAssociations : () => {}
          }
          defaultBylaw={defaultBylaw}
          onSelectDefaultBylaw={onSelectDefaultBylaw}
        />
        <ZoneCategoriesAdder
          open={activeZoneCategoryAdder}
          handleClose={handleClose}
          onZoneCategoryAdd={!isReadOnly ? onZoneCategoryAdd : () => {}}
          activeZoneCategoryId={activeZoneCategoryId}
          activeZoneCategoryAdder={activeZoneCategoryAdder}
          bylawsList={bylawsList}
        />
        {isOpen && (
          <ZoneCategoriesDialog
            activeZoneCategory={activeZoneCategory}
            closeDialog={closeDialog}
            onDelete={onDelete}
          />
        )}
      </div>
    </div>
  );
};

export default ZoneCategories;
