import React from 'react';
import 'regenerator-runtime/runtime';
import 'jest-canvas-mock';
import { render } from '@testing-library/react';
import SearchBar from './search-bar';
import SpecFriendly from '../../spec-friendly';

describe('SearchBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <SearchBar
          totalRemainingInfractions={1}
        />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});
