import React from 'react';
import classNames from 'classnames';
import { makeStyles, AppBar, Toolbar, Typography } from '@material-ui/core';
import { lighten } from '@material-ui/core/styles';
import keys from '../../../../languages/keys';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: lighten(theme.palette.grey.main, 0.2),
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: theme.spacing(),
  },
  plateNumber: {
    marginLeft: theme.spacing(0.5),
  },
}));

const LicencePlateToolbar = ({ className, licencePlate }) => {
  const classes = useStyles();

  return (
    <AppBar
      position="sticky"
      className={classNames(classes.container, className)}
    >
      <Toolbar variant="dense" classes={{ root: classes.toolbar }}>
        <Typography variant="subtitle1" noWrap>
          <FormattedMessage id={keys.licencePlateTitle} />
        </Typography>
        <Typography variant="subtitle1" className={classes.plateNumber} noWrap>
          {licencePlate.number}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default LicencePlateToolbar;
