import React from 'react';
import { render } from '@testing-library/react';
import SpecFriendly from '../../../spec-friendly';
import ByLawsSelector from './by-laws.selector';

const activeInfractionMock = {
  id: 3,
  observation: { id: 3, observedAt: new Date() },
  status: 'UNVERIFIED',
  bylaw: '2',
};

const bylawsMock = [
  {
    zoneNumber: '001',
    defaultBylaw: true,
    bylaw: {
      id: 1,
      code: '99534',
      description: '01957',
      sectionCode: '99534',
    },
  }
];

describe('By Laws Selector', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <ByLawsSelector
          activeInfraction={activeInfractionMock}
          onRequestBylaws={() => 'request bylaws'}
          onBylawUpdate={() => 'bylaw update'}
          availableBylaws={bylawsMock}
        />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});
