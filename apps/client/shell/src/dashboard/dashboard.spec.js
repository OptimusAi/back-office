import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from './dashboard';
import SpecFriendly from '../spec-friendly';

describe('Dashboard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <Dashboard />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});
