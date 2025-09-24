import React, { useState, useEffect } from 'react';
import { makeStyles, AppBar, Toolbar, Typography } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import enLocale from 'date-fns/locale/en-US';
import frLocale from 'date-fns/locale/fr';
import { useIntl } from 'react-intl';
import keys from '../../languages/keys';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    backgroundColor: theme.palette.grey.light,
    color: theme.palette.common.white,
  },
  search: {
    marginTop: theme.spacing(),
    marginLeft: theme.spacing(),
  },
  counts: {
    color: theme.palette.common.black,
  },
}));

const localeMap = {
  en: enLocale,
  fr: frLocale,
};

const Finder = ({ date, onEditing, onSearch }) => {
  const intl = useIntl();
  const [selectedDate, setSelectedDate] = useState(date);
  useEffect(() => {
    setSelectedDate(date);
  }, [date]);
  const handleChange = async (date) => {
    onEditing(true);
    setSelectedDate(date);
    onSearch(date);
  };

  return (
    <div>
      <MuiPickersUtilsProvider
        utils={DateFnsUtils}
        locale={localeMap[navigator.language]}
      >
        <KeyboardDatePicker
          leftArrowButtonProps={{ id: 'leftArrowDatePickerIcon' }}
          rightArrowButtonProps={{ id: 'rightArrowDatePickerIcon' }}
          InputAdornmentProps={{ id: 'calendarDatePickerIcon' }}
          autoOk
          disableFuture
          format={`yyyy-MM-dd`}
          value={selectedDate}
          onChange={handleChange}
          onOpen={() => onEditing(true)}
          onClose={() => onEditing(false)}
          emptyLabel={intl.formatMessage({ id: keys.selectDatePrompt })}
          invalidDateMessage={`Date format: yyyy-MM-dd`}
          InputLabelProps={{ shrink: false }}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

const SearchBar = ({ searchDate = null, onSearch, onEditing, totals }) => {
  const classes = useStyles();
  const intl = useIntl();

  const Totals = ({ totals }) => {
    const classes = useStyles();
    if (
      totals.totalInfractions === undefined &&
      totals.totalObservations === undefined
    ) {
      return (
        <Typography variant="subtitle2" className={classes.counts}>
          {`${totals.totalRemainingInfractions} ${intl.formatMessage({
            id: keys.totalRemaining,
          })}`}
        </Typography>
      );
    } else {
      return (
        <Typography variant="subtitle2" className={classes.counts}>
          {`${totals.totalInfractions} ${intl.formatMessage({
            id: keys.totalInfractions,
          })} / ${totals.totalObservations} ${intl.formatMessage({
            id: keys.totalObservations,
          })} `}
        </Typography>
      );
    }
  };

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.container} variant="dense">
        <Finder date={searchDate} onSearch={onSearch} onEditing={onEditing} />
        {totals !== undefined && searchDate !== null && (
          <Totals totals={totals} />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default SearchBar;
