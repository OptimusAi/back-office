import React from 'react';
import { render } from '@testing-library/react';
import LicencePlateActions from './licence-plate.actions';
import SpecFriendly from '../../../spec-friendly';

const activeInfractionMock = {
  id: 3,
  observation: { id: 3, observedAt: new Date() },
  status: 'UNVERIFIED',
  bylaw: '2',
};

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

const bylawsMock = [
  {
    zoneNumber: '001',
    defaultBylaw: true,
    bylaw: {
      id: 1,
      code: '99534',
      description: '01957',
    },
  },
];
describe('Licence Plate Actions', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <LicencePlateActions
          onNextPlate={() => 'next plate'}
          activeLicencePlate={activeLicencePlateMock}
          activeInfraction={activeInfractionMock}
          handleEventUpdate={() => 'handle status mock'}
          onRequestBylaws={() => 'request bylaws'}
          onBylawUpdate={() => 'bylaw update'}
          availableBylaws={bylawsMock}
          permissions={[]}
          onLicencePlateRequest={() => 'licence plate request'}
        />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});
