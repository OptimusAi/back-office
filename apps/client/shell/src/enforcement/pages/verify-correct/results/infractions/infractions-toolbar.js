import React from 'react';
import {
  makeStyles,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { useIntl } from 'react-intl';
import AllIcon from '@material-ui/icons/Menu';
import FilterIcon from '@material-ui/icons/FilterList';
import { infractionStatus } from '../../../../enforcement.enums';
import InfractionStatusIcon from './infraction-status-icon';
import keys from '../../../../../languages/keys';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    zIndex: 1,
    width: '200px',
    backgroundColor: theme.palette.grey.main,
    color: theme.palette.common.white,
  },
  stickyContainer: {
    position: 'fixed',
    zIndex: 1,
    width: '200px',
    backgroundColor: theme.palette.grey.main,
    color: theme.palette.common.white,
  },
  toolbar: {
    paddingLeft: theme.spacing(),
  },
  itemText: {
    paddingLeft: theme.spacing(),
  },
}));

const PotentialInfractionsFilter = ({ setFilterBy, removeFilter }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const intl = useIntl();

  const onOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const onClose = () => {
    setAnchorEl(null);
  };

  const onChange = (e) => {
    setFilterBy(e.currentTarget.value);
    onClose();
  };

  const onRemoveFilter = () => {
    removeFilter();
    onClose();
  };

  return (
    <>
      <IconButton edge="start" color="inherit" onClick={onOpen}>
        <FilterIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        <MenuItem onClick={onRemoveFilter}>
          <AllIcon />
          <div className={classes.itemText}>
            {intl.formatMessage({ id: keys.filterAll })}
          </div>
        </MenuItem>
        <MenuItem value={1} onClick={onChange}>
          <InfractionStatusIcon status={infractionStatus.unverified} />
          <div className={classes.itemText}>
            {intl.formatMessage({ id: keys.filterNotVerified })}
          </div>
        </MenuItem>
        <MenuItem value={2} onClick={onChange}>
          <InfractionStatusIcon status={infractionStatus.verified} />
          <div className={classes.itemText}>
            {intl.formatMessage({ id: keys.filterEnforceable })}
          </div>
        </MenuItem>
        <MenuItem value={3} onClick={onChange}>
          <InfractionStatusIcon status={infractionStatus.ignored} />
          <div className={classes.itemText}>
            {intl.formatMessage({ id: keys.filterIgnore })}
          </div>
        </MenuItem>
      </Menu>
    </>
  );
};

const InfractionsToolbar = ({ zone, setFilterBy, removeFilter, sticky }) => {
  const classes = useStyles();
  return (
    <div className={sticky ? classes.stickyContainer : classes.container}>
      <Toolbar variant="dense" classes={{ root: classes.toolbar }}>
          <PotentialInfractionsFilter
            setFilterBy={setFilterBy}
            removeFilter={removeFilter}
          />
        <Typography variant="subtitle1" noWrap>
          {`Zone (${zone !== undefined ? zone.zone : ''})`}
        </Typography>
      </Toolbar>
    </div>
  );
};

export default InfractionsToolbar;
