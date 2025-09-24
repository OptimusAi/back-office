/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { makeStyles } from '@material-ui/styles';
import { DataGrid, frFR, enUS } from '@mui/x-data-grid';
import { Button, IconButton, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import keys from '../../../languages/keys';
import ZoneEditor from './zone-editor';
import AddIcon from '@material-ui/icons/Add';
import { mapZoneRows } from '../../management.mappers';
import ZoneAdder from './zone-adder';
import { roleTypes } from '../../../admin/admin.enums';
import ZoneDialog from './zone-dialog';

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

const Zones = ({
  zones,
  zoneCategoriesList,
  zoneCitiesList,
  onZonesRequest,
  onZoneCategoriesRequest,
  onZoneCitiesRequest,
  onSelectedZone,
  activeZone,
  onZoneUpdate,
  onZoneAdd,
  activeZoneEditor,
  activeZoneAdder,
  onEdit,
  onDelete,
  onAdd,
  permissions,
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
        field: 'zone',
        headerName: intl.formatMessage({ id: keys.zone }),
        flex: 1,
        editable: false,
      },
      {
        field: 'zoneCategory',
        headerName: intl.formatMessage({ id: keys.zoneCategoryTitle }),
        flex: 1.5,
        editable: false,
      },
      {
        field: 'zoneAddress',
        headerName: intl.formatMessage({ id: keys.zoneAddressTitle }),
        flex: 1.5,
        editable: false,
      },
      {
        field: 'zoneCity',
        headerName: intl.formatMessage({ id: keys.zoneCityTitle }),
        flex: 1.5,
        editable: false,
      },
      {
        field: 'pairingTimeLimit',
        headerName: intl.formatMessage({ id: keys.pairingTimeLimitTitle }),
        flex: 1.5,
        editable: false,
      },
      {
        field: 'arrivalGraceTime',
        headerName: intl.formatMessage({ id: keys.arrivalGraceTimeTitle }),
        flex: 1.5,
        editable: false,
      },
      {
        field: 'departureGraceTime',
        headerName: intl.formatMessage({ id: keys.departureGraceTimeTitle }),
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
  }, []);

  useEffect(() => {
    if (zoneCategoriesList.length === 0 && zoneCitiesList.length === 0) {
      onZoneCategoriesRequest();
      onZoneCitiesRequest();
    }
  }, [
    zoneCategoriesList,
    zoneCitiesList,
    onZoneCategoriesRequest,
    onZoneCitiesRequest,
  ]);

  useEffect(() => {
    if (zones !== []) {
      setRows(mapZoneRows(zones));
    }
  }, [zones]);

  useEffect(() => {
    isReadOnly = !permissions.includes(roleTypes[0]);
  }, [permissions]);

  const handleZoneEditor = () => {
    onEdit(true);
  };

  const handleZoneUpdate = (updatedZone) => {
    onZoneUpdate(updatedZone);
  };

  const handleZoneAdd = (newZone) => {
    onZoneAdd(newZone);
  };

  const renderActionButton = () => {
    return (
      <IconButton onClick={() => handleZoneEditor()} disabled={isReadOnly}>
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

  const handleZoneAdder = () => {
    onAdd(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'backdropClick') {
      return;
    }
    onEdit(false);
    onAdd(false);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <div className={classes.container}>
      <div className={classes.gridToolbar}>
        <Typography variant="h5">
          {intl.formatMessage({ id: keys.zonesTitle })}
        </Typography>
        <Button
          disabled={isReadOnly}
          onClick={() => handleZoneAdder()}
          startIcon={<AddIcon />}
          variant="contained"
          color="primary"
        >
          {intl.formatMessage({ id: keys.zoneAdderTitle })}
        </Button>
      </div>
      <div className={classes.gridContainer}>
        <DataGrid
          rows={rows}
          columns={columns}
          onCellClick={(e) => onSelectedZone(e.id)}
          localeText={
            navigator.language === 'fr'
              ? frFR.components.MuiDataGrid.defaultProps.localeText
              : enUS.components.MuiDataGrid.defaultProps.localeText
          }
        />
        <ZoneEditor
          open={activeZoneEditor}
          handleClose={handleClose}
          zone={activeZone}
          onZoneUpdate={handleZoneUpdate}
          zoneCitiesList={zoneCitiesList}
          zoneCategoriesList={zoneCategoriesList}
          activeZoneEditor={activeZoneEditor}
        />
        <ZoneAdder
          open={activeZoneAdder}
          handleClose={handleClose}
          onZoneAdd={handleZoneAdd}
          zoneCitiesList={zoneCitiesList}
          zoneCategoriesList={zoneCategoriesList}
          activeZoneAdder={activeZoneAdder}
        />
        {isOpen && (
          <ZoneDialog
            activeZoneId={activeZone.id}
            closeDialog={closeDialog}
            onDelete={onDelete}
          />
        )}
      </div>
    </div>
  );
};

export default Zones;
