/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ReportIcon from '@material-ui/icons/Report';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { roles, roleTypes } from '../../admin.enums';
import { useIntl } from 'react-intl';
import keys from '../../../languages/keys';

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: 'column',
    margin: theme.spacing(4),
  },
  listContainer: {
    width: '100%',
    height: 'fit-content',
    maxWidth: 360,
    borderRadius: '4px',
    border: `solid 1px rgb(224, 224, 224)`,
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(2),
    flexDirection: 'column',
  },
  rolesTitle: {
    textAlign: 'left',
    marginLeft: theme.spacing(1),
  },
}));

const RolesList = ({ activeRole, onSelectedRole }) => {
  const classes = useStyles();
  const intl = useIntl();

  const getRoleIcon = (role) => {
    if (role === roleTypes[0]) {
      return <AssignmentIndIcon />;
    }
    if (role === roleTypes[1]) {
      return <ReportIcon />;
    }
    if (role === roleTypes[2]) {
      return <VisibilityIcon />;
    }
  };

  return (
    <div className={classes.container}>
      <Typography className={classes.rolesTitle} variant="h5">
        {intl.formatMessage({ id: keys.rolesTitle })}
      </Typography>
      <List className={classes.listContainer}>
        {roles.map((role, index) => (
          <ListItem
            key={index}
            onClick={(event) => onSelectedRole(index)}
            button
            selected={activeRole === index}
          >
            <ListItemAvatar>
              <Avatar>{getRoleIcon(role.code)}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={role.role.charAt(0).toUpperCase() + role.role.slice(1)}
              secondary={role.description}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default RolesList;
