import React from 'react';
import { render } from '@testing-library/react';
import LicencePlateToolbar from './licence-plate.toolbar';
import SpecFriendly from '../../../spec-friendly';

const activeLicencePlateMock = {
  id: 1,
  number: 'TESTPLATE001',
  zones: [
    {
      id: '153a7bc-4b7a-4fe3-9485-4d795a79e35',
      number: '2004',
      sessions: null,
      infractions: [],
    },
  ],
};

describe('Licence Plate Toolbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <LicencePlateToolbar licencePlate={activeLicencePlateMock} />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});
