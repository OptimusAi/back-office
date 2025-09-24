import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { getUserRoles, getUsers, updateRole, removeRole } from '@park-plus/api';
import { mapUsers, mapUser } from '../admin.mappers';
import { roleTypes } from '../admin.enums';

export const USERS_FEATURE_KEY = 'users';

export const usersAdapter = createEntityAdapter();

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (data, { rejectWithValue }) => {
    const usersResponse = await getUsers();
    const users = usersResponse.data.map((u) => ({
      id: u.id,
      parkPlusUserId: u.parkPlusUserId,
      emailAddress: u.emailAddress,
    }));
    const userRolesResponse = await getUserRoles(users || []);
    let mappedUsers = [];

    if (usersResponse.data && userRolesResponse.data) {
      mappedUsers = mapUsers(users, userRolesResponse.data);
    }

    return usersResponse.ok && userRolesResponse.ok
      ? mappedUsers
      : rejectWithValue(usersResponse.errors);
  }
);

export const updateUserRole = createAsyncThunk(
  'users/updateUserRole',
  async (userId, { rejectWithValue, getState }) => {
    let mappedUser = '';
    const currentState = getState().admin.users;
    const activeRole = roleTypes[currentState.activeRole];
    let body = {
      newSimpleGrantedAuthority: activeRole,
      parkPlusPrincipalId: userId,
    };

    const response = await updateRole(body);
    if (response.ok) {
      mappedUser = mapUser(response.data);
    }
    return response.ok ? mappedUser : rejectWithValue(response.errors);
  }
);

export const removeUserRole = createAsyncThunk(
  'users/removeUserRole',
  async (parkPlusId, { rejectWithValue, getState }) => {
    let mappedUser = '';
    const currentState = getState().admin.users;
    const activeRole = roleTypes[currentState.activeRole];
    let body = {
      toDeleteSimpleGrantedAuthority: activeRole,
      parkPlusPrincipalId: parkPlusId,
    };
    const response = await removeRole(body);
    if (response.ok) {
      mappedUser = mapUser(response.data);
    }
    return response.ok ? mappedUser : rejectWithValue(response.errors);
  }
);

export const initialUsersState = usersAdapter.getInitialState({
  busy: false,
  error: null,
  roles: null,
  activeRole: null,
  activeUserAdder: false,
});

export const usersSlice = createSlice({
  name: USERS_FEATURE_KEY,
  initialState: initialUsersState,
  reducers: {
    setActiveRole: (state, action) => {
      state.activeRole = action.payload;
    },
    setActiveUserAdder: (state, action) => {
      state.activeUserAdder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.busy = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        usersAdapter.setAll(state, action.payload);
        state.busy = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.busy = false;
        state.error = action.error.message;
      })

      .addCase(updateUserRole.pending, (state) => {
        state.busy = true;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        usersAdapter.updateOne(state, {
          id: action.payload.id,
          changes: {
            authorities: action.payload.authorities,
          },
        });
        state.busy = false;
        state.activeUserAdder = false;
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.busy = false;
        state.error = action.error.message;
      })

      .addCase(removeUserRole.pending, (state) => {
        state.busy = true;
      })
      .addCase(removeUserRole.fulfilled, (state, action) => {
        usersAdapter.updateOne(state, {
          id: action.payload.id,
          changes: {
            authorities: action.payload.authorities,
          },
        });
        state.busy = false;
      })
      .addCase(removeUserRole.rejected, (state, action) => {
        state.busy = false;
        state.error = action.error.message;
      })

      .addDefaultCase((state) => state);
  },
});

export const usersReducer = usersSlice.reducer;

export const { setActiveRole, setActiveUserAdder } = usersSlice.actions;

export const usersActions = usersSlice.actions;

export const usersSelectors = usersAdapter.getSelectors();

export const {
  selectIds,
  selectEntities,
  selectById,
  selectTotal,
  selectAll,
} = usersSelectors;

export const getUsersState = (rootState) => {
  return rootState[USERS_FEATURE_KEY];
};

export const selectAllUsers = createSelector(getUsersState, selectAll);

export const selectUserEntities = createSelector(getUsersState, selectEntities);
