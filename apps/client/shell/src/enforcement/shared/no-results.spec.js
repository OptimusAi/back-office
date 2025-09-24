import React from 'react';
import 'jest-canvas-mock';
import { render } from '@testing-library/react';
import NoResults from './no-results';
import SpecFriendly from '../../../src/spec-friendly';
import keys from '../../languages/keys';

describe('No Results', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <NoResults messageId={keys.void} />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});