import React from 'react';
import { render } from '@testing-library/react';
import SpecFriendly from '../../../spec-friendly';
import Roles from './roles';

describe('Roles', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <Roles
          activeRole={1}
          onSelectedRole={() => console.log('selected role')}
          onUsersRequest={() => console.log('users request')}
          users={[]}
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
