import React from 'react';
import { render } from '@testing-library/react';
import SpecFriendly from '../../../spec-friendly';
import RolesList from './roles-list';

describe('Roles List', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <RolesList
          activeRole={1}
          onSelectedRole={() => console.log('selected role')}
        />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});
