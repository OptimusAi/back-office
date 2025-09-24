import React from 'react';
import { render } from '@testing-library/react';
import InfractionHelp from './infraction-help';
import SpecFriendly from '../../../../../spec-friendly';

describe('Infraction Help', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <InfractionHelp />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});
