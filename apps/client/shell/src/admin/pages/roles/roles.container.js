import { connect } from 'react-redux';
import Roles from './roles';
import {
  setActiveRole,
  fetchUsers,
  usersSelectors,
  updateUserRole,
  setActiveUserAdder,
  removeUserRole,
} from '../../state/users.slice';

export const mapStateToProps = (state) => ({
  activeRole: state.admin.users.activeRole,
  users: usersSelectors.selectAll(state.admin.users),
  activeUserAdder: state.admin.users.activeUserAdder,
});

export const mapDispatchToProps = (dispatch) => ({
  onSelectedRole: (role) => {
    dispatch(setActiveRole(role));
  },
  onUsersRequest: (role) => {
    dispatch(fetchUsers(role));
  },
  onUpdateRole: (user) => {
    dispatch(updateUserRole(user));
  },
  onActiveUserAdder: (isActive) => {
    dispatch(setActiveUserAdder(isActive));
  },
  onUserRoleRemove: (parkPlusId) => {
    dispatch(removeUserRole(parkPlusId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
