import React from 'react';
import 'jest-canvas-mock';
import { render } from '@testing-library/react';
import LicencePlateTimeline from './licence-plate.timeline';
import SpecFriendly from '../../../spec-friendly';

const activeInfractionMock = {
  id: 3,
  observations: [{
    id: 3,
    observedAt: new Date(),
    licencePlate: {
      licencePlateNumber: 'TESTPLT',
      countrySubdivision: {
        name: 'ALBERTA',
        code: 'AB',
        countryCode: 'CA',
        country: 'Canada',
        regionType: 'PROVINCE',
      },
    },
    zone: '001',
    eventType: 'REALTIME',
    photos: [
      { url: 'http://fakeurl.com', imageType: 'PROFILE' },
      { url: 'http://fakeurl.com', imageType: 'PLATE' },
    ],
  }],
  status: 'UNVERIFIED',
  licencePlate: {
    licencePlateNumber: 'TESTPLT',
    countrySubdivision: {
      name: 'ALBERTA',
      code: 'AB',
      countryCode: 'CA',
      country: 'Canada',
      regionType: 'PROVINCE',
    },
  },
  enforcementPhotos: [
    { url: 'http://fakeurl.com', imageType: 'PROFILE', useToEnforce: true },
    { url: 'http://fakeurl.com', imageType: 'PLATE', useToEnforce: true },
  ],
  zone: {
    zone: '1'
  }
};

const activeLicencePlateMock = {
  id: 1,
  number: 'TESTPLATE001',
  zones: [
    {
      id: '153a7bc-4b7a-4fe3-9485-4d795a79e35',
      number: '2004',
      sessions: [{id: 1, start: '', end: ''}],
      permitSchedules: [],
      infractions: [],
    },
  ],
};

const infractionsMock = [activeInfractionMock]
describe('Licence Plate Timeline', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <LicencePlateTimeline
          activeLicencePlate={activeLicencePlateMock}
          activeInfraction={activeInfractionMock}
          licencePlateInfractions={infractionsMock}
          onInfractionSelect={() => 'infraction Select Mock'}
        />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});
