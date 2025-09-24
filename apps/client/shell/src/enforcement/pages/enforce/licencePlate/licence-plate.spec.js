import 'regenerator-runtime/runtime';
import React from 'react';
import 'jest-canvas-mock';
import ShallowRenderer from 'react-test-renderer/shallow';
import LicencePlate from './licence-plate';
import SpecFriendly from '../../../../spec-friendly';

const activeInfractionMock = {
  id: 3,
  observation: {
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
    countrySubdivision: {
      name: 'ALBERTA',
      code: 'AB',
      countryCode: 'CA',
      country: 'Canada',
      regionType: 'PROVINCE',
    },
    zone: '001',
    photos: [
      { url: 'http://fakeurl.com', imageType: 'PROFILE' },
      { url: 'http://fakeurl.com', imageType: 'PLATE' },
    ],
  },
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

describe('Licence Plate Component', () => {
  it('should render successfully', () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <SpecFriendly>
        <LicencePlate
          activeLicencePlate={activeLicencePlateMock}
          activeInfraction={activeInfractionMock}
          regions={[]}
          availableBylaws={bylawsMock}
          onNextPlate={() => 'Next Plate Mock'}
          onImageUpdate={() => 'Image Udpdate Mock'}
          onLicencePlateUpdate={() => 'Licence Plate Update Mock'}
          onEventUpdate={() => 'Status Update Mock'}
          onInfractionSelect={() => 'infraction Select Mock'}
          onBylawUpdate={() => 'bylaw update'}
          onRequestBylaws={() => 'request bylaws'}
          permissions={[]}
        />
      </SpecFriendly>
    );
    const result = renderer.getRenderOutput();
    expect(result).toBeTruthy();
  });
});
