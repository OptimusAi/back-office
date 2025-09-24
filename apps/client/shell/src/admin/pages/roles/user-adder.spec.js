import React from 'react';
import { render } from '@testing-library/react';
import SpecFriendly from '../../../spec-friendly';
import UserAdder from './user-adder';

describe('User Adder', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <UserAdder
          activeRole={1}
          users={[]}
          activeUserAdder={false}
          onActiveUserAdder={() => console.log('active user')}
          onUpdateRole={() => console.log('update role')}
        />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});