import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import {
  makeStyles,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import SpaceBarIcon from '@material-ui/icons/SpaceBar';
import KeyboardTabIcon from '@material-ui/icons/KeyboardTab';
import { FormattedMessage } from 'react-intl';
import keys from '../../../../../languages/keys';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
}));

const infractionHotKeys = [
  {
    id: 'delete',
    icon: 'delete',
  },
  {
    id: 'arrowDown',
    icon: 'down',
  },
  {
    id: 'arrowRight',
    icon: 'right',
  },
  {
    id: 'arrowLeft',
    icon: 'left',
  },
  {
    id: 'tab',
    icon: 'tab',
  },
  {
    id: 'enter',
    icon: 'enter',
  },
  {
    id: 'esc',
    icon: 'esc',
  },
  {
    id: 'space',
    icon: 'spacebar',
  },
];

const enforceableInfractionHotKeys = [
  {
    id: 'arrowUp',
    icon: 'up',
  },
  {
    id: 'arrowDown',
    icon: 'down',
  },
  {
    id: 'arrowRightEnforce',
    icon: 'right',
  },
  {
    id: 'arrowLeft',
    icon: 'left',
  },
];

const ArrowIcon = ({ icon }) => {
  if (icon === 'up') {
    return <ArrowUpwardIcon />;
  }
  if (icon === 'down') {
    return <ArrowDownwardIcon />;
  }
  if (icon === 'right') {
    return <ArrowForwardIcon />;
  }
  if (icon === 'left') {
    return <ArrowBackIcon />;
  }
  if (icon === 'enter') {
    return <KeyboardReturnIcon />;
  }
  if (icon === 'esc') {
    return <Typography variant="caption">esc</Typography>;
  }
  if (icon === 'spacebar') {
    return <SpaceBarIcon />;
  }
  if (icon === 'tab') {
    return <KeyboardTabIcon />;
  }
  if (icon === 'delete') {
    return <Typography variant="caption">delete</Typography>;
  }
};

const InfractionHelp = ({ isForEnforce }) => {
  const classes = useStyles();
  const [hotKeys, setHotKeys] = useState([]);
  const intl = useIntl();

  useEffect(() => {
    if (isForEnforce) {
      setHotKeys(enforceableInfractionHotKeys);
    } else {
      setHotKeys(infractionHotKeys);
    }
  }, [isForEnforce]);

  return (
    <div className={classes.container}>
      <Typography variant="h6" gutterBottom>
        {intl.formatMessage({
          id: keys.keyboardNavigationTitle,
        })}
      </Typography>
      {hotKeys.map((hotKey, index) => (
        <ListItem key={index}>
          <ListItemIcon>
            <ArrowIcon icon={hotKey.icon} />
          </ListItemIcon>
          <ListItemText primary={<FormattedMessage id={hotKey.id} />} />
        </ListItem>
      ))}
    </div>
  );
};

export default InfractionHelp;
