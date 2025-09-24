import React from 'react';
import { render } from '@testing-library/react';
import InfractionToolbar from './infraction-toolbar';
import SpecFriendly from '../../../../../spec-friendly';

const activeInfractionMock = {
  id: 3,
  observation: { id: 3, observedAt: new Date() },
  status: 'UNVERIFIED',
};

describe('InfractionsActions', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <InfractionToolbar infraction={activeInfractionMock} />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});
