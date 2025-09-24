/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import UsersList from './users-list';
import RolesList from './roles-list';
import { roleTypes } from '../../admin.enums';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    width: '100%',
  },
}));

const Roles = ({
  activeRole,
  onSelectedRole,
  onUsersRequest,
  users,
  activeUserAdder,
  onActiveUserAdder,
  onUpdateRole,
  onUserRoleRemove,
}) => {
  const classes = useStyles();
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    if (users.length === 0) {
      onUsersRequest(activeRole);
    }
  }, [users]);

  useEffect(() => {
    if (activeRole !== null) {
      const filteredUsers = users.filter((user) =>
        user.authorities.includes(roleTypes[activeRole])
      );
      setFilteredUsers(filteredUsers);
    }
  }, [activeRole, users]);

  return (
    <div className={classes.container}>
      <RolesList onSelectedRole={onSelectedRole} activeRole={activeRole} />
      {filteredUsers !== [] && (
        <UsersList
          users={users}
          filteredUsers={filteredUsers}
          activeRole={activeRole}
          activeUserAdder={activeUserAdder}
          onUpdateRole={onUpdateRole}
          onActiveUserAdder={onActiveUserAdder}
          onUserRoleRemove={onUserRoleRemove}
        />
      )}
    </div>
  );
};

export default Roles;
