import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from '@testing-library/react';
import SpecFriendly from '../spec-friendly';
import Admin from './admin';


describe('Admin', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <Admin permissions={[]}/>
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});
