import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  makeStyles,
  Snackbar,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import { Autocomplete } from '@material-ui/lab';
import MuiAlert from '@material-ui/lab/Alert';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import enLocale from 'date-fns/locale/en-US';
import frLocale from 'date-fns/locale/fr';
import { FormattedMessage, useIntl } from 'react-intl';
import { connect } from 'react-redux';
import keys from '../../../languages/keys';
import {
  deleteInfractions,
  fetchOperatorsAndDevices,
} from '../../state/infractions.slice';
import { getFormattedDate } from '../../../utils/enforcement.utils';
import { Busy } from '@park-plus/ui';

const useStyles = makeStyles((theme) => ({
  navigation: {
    backgroundColor: theme.palette.grey.light,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    padding: theme.spacing(3),
  },
  field: {
    marginBottom: theme.spacing(2),
  },
  firstColumn: {
    display: 'grid',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: theme.spacing(),
    width: '50%',
  },
  infractionActionsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  cancelButton: {
    margin: `${theme.spacing()}px ${theme.spacing()}px ${theme.spacing()}px 0px`,
  },
  deleteButton: {
    margin: `${theme.spacing()}px 0px ${theme.spacing()}px ${theme.spacing()}px`,
  },
  delete: {
    color: theme.palette.error.main,
  },
  cancel: {
    color: theme.palette.success.main,
  },
  errorField: {
    '& .MuiOutlinedInput-root': {
      borderColor: theme.palette.error.main,
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.error.main,
      },
    },
    '& .MuiFormLabel-root': {
      color: theme.palette.error.main,
    },
  },
}));

const localeMap = {
  en: enLocale,
  fr: frLocale,
};

const DeleteInfractions = ({
  onDeleteInfractions,
  fetchOperatorsAndDevices,
}) => {
  const classes = useStyles();
  const intl = useIntl();

  const initialFormState = {
    observationDate: null,
    zone: '',
    fromTime: '',
    toTime: '',
    unitNumber: '',
    operator: '',
  };

  const [formState, setFormState] = useState(initialFormState);
  const [open, setOpen] = useState(false);
  const [isObservationDateInvalid, setIsObservationDateInvalid] = useState(
    false
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [deletedCount, setDeletedCount] = useState(null);
  const [unitNumbers, setUnitNumbers] = useState([]);
  const [operatorNames, setOperators] = useState([]);
  const [loading, setLoading] = useState(false);
  const dateInputRef = React.useRef(null);
  const datePickerButtonRef = React.useRef(null);

  useEffect(() => {
    if (formState.observationDate) {
      fetchOperatorsAndDevices(formState.observationDate).then((response) => {
        setUnitNumbers(response.payload.unitNumbers || []);
        setOperators(response.payload.operatorNames || []);
      });
    }
  }, [formState.observationDate, fetchOperatorsAndDevices]);

  const formatZones = (zoneString) => zoneString?.split(',') || [];
  const formatTime = (value) => {
    const digits = value.replace(/\D/g, '');
    return digits
      .slice(0, 6)
      .replace(/(\d{2})(\d{2})(\d{2})?/, (match, hh, mm, ss) =>
        [hh, mm, ss].filter(Boolean).join(':')
      );
  };

  const handleDelete = () => {
    if (!formState.observationDate) {
      setIsObservationDateInvalid(true);
      return;
    }
    setIsObservationDateInvalid(false);
    setOpen(true);
  };

  const confirmDelete = () => {
    setLoading(true);
    setOpen(false);
    const payload = {
      observedDate: getFormattedDate(formState.observationDate),
      zones: formatZones(formState.zone),
      startTime: formState.fromTime || null,
      endTime: formState.toTime || null,
      deviceId: formState.unitNumber || null,
      operatorName: formState.operator || null,
    };

    onDeleteInfractions(payload)
      .then((response) => {
        setDeletedCount(response.payload);
        setSnackbarOpen(true);
        resetFormState();
      })
      .catch((error) => {
        console.error('Error deleting infractions:', error);
      })
      .finally(() => {
        setLoading(false);
        setOpen(false);
      });
  };

  const resetFormState = () => {
    setFormState(initialFormState);
  };

  const closeDialog = () => {
    setOpen(false);
    resetFormState();
  };

  const handleCancel = resetFormState;

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleEmptyLabelClick = () => {

    if (datePickerButtonRef.current) {
      datePickerButtonRef.current.click();
    }
  };

  return (
    <div>
      <Busy busy={loading} />
      <Toolbar position="static" className={classes.navigation}>
        <Typography variant="subtitle1" noWrap>
          <FormattedMessage id={keys.deleteObservationTitle} />
        </Typography>
      </Toolbar>
      <div className={classes.container}>
        <div className={classes.firstColumn}>
          <FormControl
            fullWidth
            className={`${classes.field} ${
              isObservationDateInvalid ? classes.errorField : ''
            }`}
            error={isObservationDateInvalid}
          >
            <MuiPickersUtilsProvider
              utils={DateFnsUtils}
              locale={localeMap[navigator.language]}
            >
              <KeyboardDatePicker
                autoOk
                disableFuture
                format="yyyy-MM-dd"
                value={formState.observationDate}
                onChange={(date) => {
                  setFormState((prev) => ({ ...prev, observationDate: date }));
                  setIsObservationDateInvalid(false);
                }}
                emptyLabel={intl.formatMessage({ id: keys.selectDatePrompt })}
                invalidDateMessage="Date format: yyyy-MM-dd"
                InputLabelProps={{ shrink: true }}
                inputRef={dateInputRef}
                KeyboardButtonProps={{
                  ref: datePickerButtonRef,
                  'aria-label': 'change date',
                }}
                InputProps={{
                  onClick: handleEmptyLabelClick,
                }}
                label={
                  <>
                    {intl.formatMessage({ id: keys.observationDateTitle })}{' '}
                    <span style={{ color: 'red' }}>*</span>
                  </>
                }
              />
            </MuiPickersUtilsProvider>
          </FormControl>
          <FormControl fullWidth className={classes.field}>
            <TextField
              fullWidth
              label={intl.formatMessage({ id: keys.zone })}
              value={formState.zone}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, zone: e.target.value }))
              }
            />
          </FormControl>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth className={classes.field}>
                <TextField
                  label={intl.formatMessage({ id: keys.fromTimeTitle })}
                  type="text"
                  placeholder="HH:MM:SS"
                  InputLabelProps={{ shrink: true }}
                  value={formState.fromTime}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      fromTime: formatTime(e.target.value),
                    }))
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth className={classes.field}>
                <TextField
                  label={intl.formatMessage({ id: keys.toTimeTitle })}
                  type="text"
                  placeholder="HH:MM:SS"
                  InputLabelProps={{ shrink: true }}
                  value={formState.toTime}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      toTime: formatTime(e.target.value),
                    }))
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
          <FormControl fullWidth className={classes.field}>
            <Autocomplete
              fullWidth
              disableClearable={false}
              selectOnFocus
              value={formState.unitNumber}
              onChange={(e, newValue) =>
                setFormState((prev) => ({
                  ...prev,
                  unitNumber: newValue ?? '',
                }))
              }
              options={['', ...unitNumbers]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={intl.formatMessage({ id: keys.unitNumberTitle })}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth className={classes.field}>
            <Autocomplete
              fullWidth
              disableClearable={false}
              selectOnFocus
              value={formState.operator}
              onChange={(e, newValue) =>
                setFormState((prev) => ({
                  ...prev,
                  operator: newValue ?? '',
                }))
              }
              options={operatorNames || []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={intl.formatMessage({ id: keys.operatorIdTitle })}
                />
              )}
            />
          </FormControl>
          <div className={classes.infractionActionsContainer}>
            <Button
              className={classes.cancelButton}
              variant="outlined"
              onClick={handleCancel}
              startIcon={<ClearIcon className={classes.cancel} />}
            >
              <FormattedMessage id={keys.cancelButtonLabel} />
            </Button>
            <Button
              className={classes.deleteButton}
              variant="outlined"
              onClick={handleDelete}
              startIcon={<DeleteIcon className={classes.delete} />}
            >
              <FormattedMessage id={keys.deleteButtonLabel} />
            </Button>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {intl.formatMessage({ id: keys.deleteObservationDialogTitle })}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <FormattedMessage id={keys.deleteObservationDialogMessage} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            {intl.formatMessage({ id: keys.deleteObservationCancelButton })}
          </Button>
          <Button onClick={confirmDelete} color="secondary" autoFocus>
            {intl.formatMessage({ id: keys.deleteObservationConfirmButton })}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={snackbarOpen}
        autoHideDuration={null}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity="success"
          elevation={6}
          variant="filled"
        >
          {deletedCount !== null
            ? intl.formatMessage(
                { id: keys.deleteInfractionsSuccessMessage },
                { infractions: deletedCount }
              )
            : intl.formatMessage({ id: keys.deleteInfractionsSuccessMessage })}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onDeleteInfractions: (payload) => dispatch(deleteInfractions(payload)),
  fetchOperatorsAndDevices: (date) => dispatch(fetchOperatorsAndDevices(date)),
});

export default connect(null, mapDispatchToProps)(DeleteInfractions);
