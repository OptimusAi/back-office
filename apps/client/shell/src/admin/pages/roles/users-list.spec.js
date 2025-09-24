import React from 'react';
import { render } from '@testing-library/react';
import SpecFriendly from "../../../spec-friendly";
import UsersList from './users-list';

describe('Users List', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <UsersList
            users={[]}
            activeRole={1}
            onSelectedRole={() => console.log('selected role')}
            onUsersRequest={() => console.log('users request')}
            filteredUsers={[]}
            activeUserAdder={false}
            onActiveUserAdder={() => console.log('active user')}
            onUpdateRole={() => console.log('update role')}
            onUserRoleRemove={() => console.log('remove role')}
        />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});