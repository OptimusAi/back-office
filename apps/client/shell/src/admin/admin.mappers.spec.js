import { mappedUsers, roles, users } from '../utils/test-utils/mocks';
import { mapUser, mapUsers } from './admin.mappers';

describe('Admin Mappers', () => {
  test('map users', () => {
    const adminMappedUsers = mapUsers(users, roles);
    expect(adminMappedUsers[0]).toStrictEqual(mappedUsers[0]);
  });

  test('map user', () => {
    const mappedUser = mapUser(roles[0]);
    expect(mappedUser).toStrictEqual({
      externalId: '110022',
      externalIdIssuer: 'test',
      id: '306',
      authorities: ['ROLE_ADMIN'],
    });
  });
});
