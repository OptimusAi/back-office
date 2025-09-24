import 'regenerator-runtime/runtime';
import {
  fetchUsers,
  removeUserRole,
  updateUserRole,
  usersActions,
  usersReducer,
} from './users.slice';

describe('users reducer', () => {
  it('should handle initial state', () => {
    const expected = {
      entities: {},
      ids: [],
      busy: false,
      error: null,
      roles: null,
      activeRole: null,
      activeUserAdder: false,
    };
    expect(usersReducer(undefined, { type: '' })).toEqual(expected);
  });
  describe('fetch users', () => {
    it('should handle fetch users pending', () => {
      let state = usersReducer(undefined, fetchUsers.pending(null, null));
      expect(state).toEqual(
        expect.objectContaining({
          entities: {},
          ids: [],
          busy: true,
          error: null,
          roles: null,
          activeRole: null,
          activeUserAdder: false,
        })
      );
    });

    it('should handle fetch users fullfilled', () => {
      let state = usersReducer(
        undefined,
        fetchUsers.fulfilled(
          [
            { id: 1, role: 'ROLE_ADMIN' },
            { id: 2, role: 'ROLE_ENFORCEMENT' },
          ],
          null,
          null
        )
      );
      expect(state).toEqual(
        expect.objectContaining({
          entities: {
            1: { id: 1, role: 'ROLE_ADMIN' },
            2: { id: 2, role: 'ROLE_ENFORCEMENT' },
          },
          ids: [1, 2],
          busy: false,
          error: null,
          roles: null,
          activeRole: null,
          activeUserAdder: false,
        })
      );
    });

    it('should handle fetch users rejected', () => {
      let state = usersReducer(
        undefined,
        fetchUsers.rejected(new Error('Uh oh'), null, null)
      );
      expect(state).toEqual(
        expect.objectContaining({
          entities: {},
          ids: [],
          busy: false,
          error: 'Uh oh',
          roles: null,
          activeRole: null,
          activeUserAdder: false,
        })
      );
    });
  });

  describe('update user role', () => {
    it('should handle update user role pending', () => {
      let state = usersReducer(undefined, updateUserRole.pending(null, null));
      expect(state).toEqual(
        expect.objectContaining({
          entities: {},
          ids: [],
          busy: true,
          error: null,
          roles: null,
          activeRole: null,
          activeUserAdder: false,
        })
      );
    });

    it('should handle update user role fullfilled', () => {
      let state = usersReducer(
        {
          entities: {
            1: { id: 1, authorities: ['ROLE_ADMIN'] },
          },
          ids: [1],
          busy: false,
          error: null,
          roles: null,
          activeRole: null,
          activeUserAdder: false,
        },
        updateUserRole.fulfilled(
          { id: 1, authorities: ['ROLE_ADMIN', 'ROLE_ENFORCEMENT'] },
          null,
          null
        )
      );
      expect(state).toEqual(
        expect.objectContaining({
          entities: {
            1: { id: 1, authorities: ['ROLE_ADMIN', 'ROLE_ENFORCEMENT'] },
          },
          ids: [1],
          busy: false,
          error: null,
          roles: null,
          activeRole: null,
          activeUserAdder: false,
        })
      );
    });

    it('should handle update user role rejected', () => {
      let state = usersReducer(
        undefined,
        updateUserRole.rejected(new Error('Uh oh'), null, null)
      );
      expect(state).toEqual(
        expect.objectContaining({
          entities: {},
          ids: [],
          busy: false,
          error: 'Uh oh',
          roles: null,
          activeRole: null,
          activeUserAdder: false,
        })
      );
    });
  });

  describe('remove user role', () => {
    it('should handle remove user role pending', () => {
      let state = usersReducer(undefined, removeUserRole.pending(null, null));
      expect(state).toEqual(
        expect.objectContaining({
          entities: {},
          ids: [],
          busy: true,
          error: null,
          roles: null,
          activeRole: null,
          activeUserAdder: false,
        })
      );
    });

    it('should handle remove user role fullfilled', () => {
      let state = usersReducer(
        {
          entities: {
            1: { id: 1, authorities: ['ROLE_ADMIN', 'ROLE_ENFORCEMENT'] },
          },
          ids: [1],
          busy: false,
          error: null,
          roles: null,
          activeRole: null,
          activeUserAdder: false,
        },
        removeUserRole.fulfilled(
          { id: 1, authorities: ['ROLE_ENFORCEMENT'] },
          null,
          null
        )
      );
      expect(state).toEqual(
        expect.objectContaining({
          entities: {
            1: { id: 1, authorities: ['ROLE_ENFORCEMENT'] },
          },
          ids: [1],
          busy: false,
          error: null,
          roles: null,
          activeRole: null,
          activeUserAdder: false,
        })
      );
    });

    it('should handle remove user role rejected', () => {
      let state = usersReducer(
        undefined,
        removeUserRole.rejected(new Error('Uh oh'), null, null)
      );
      expect(state).toEqual(
        expect.objectContaining({
          entities: {},
          ids: [],
          busy: false,
          error: 'Uh oh',
          roles: null,
          activeRole: null,
          activeUserAdder: false,
        })
      );
    });
  });
  describe('select active role', () => {
    it('should set active role', () => {
      const activeRole = 1;
      const expected = {
        ids: [],
        entities: {},
        busy: false,
        error: null,
        roles: null,
        activeRole: 1,
        activeUserAdder: false,
      };
      expect(
        usersReducer(undefined, {
          type: usersActions.setActiveRole,
          payload: activeRole,
        })
      ).toEqual(expected);
    });
  });

  describe('set active user adder', () => {
    it('should set active user adder', () => {
      const expected = {
        ids: [],
        entities: {},
        busy: false,
        error: null,
        roles: null,
        activeRole: null,
        activeUserAdder: true,
      };
      expect(
        usersReducer(undefined, {
          type: usersActions.setActiveUserAdder,
          payload: true,
        })
      ).toEqual(expected);
    });
  });
});
