import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from '@testing-library/react';
import Infraction from './infraction';
import SpecFriendly from '../../../../../spec-friendly';
import { zonesMock } from '../../../../../utils/test-utils/mocks';
const activeInfractionMock = {
  id: 3,
  observations: [
    {
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
      zone: {id: 1, zone: 1},
      photos: [
        { url: 'http://fakeurl.com', imageType: 'PROFILE' },
        { url: 'http://fakeurl.com', imageType: 'PLATE' },
      ],
    },
  ],
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
    id: 1,
    zone: 1,
    address: 'test',
  },
};
describe('Infraction Component', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <Infraction
          permissions={[]}
          activeInfraction={activeInfractionMock}
          originalActiveInfraction={activeInfractionMock}
          onImageUpdate={() => console.log('image update')}
          onLicencePlateUpdate={() => console.log('plate update')}
          onNext={() => console.log('next')}
          onEventUpdate={() => console.log('event update')}
          onZoneUpdate={() => console.log('zone update')}
          onEditing={() => console.log('on editing')}
          regions={[]}
          zones={zonesMock}
          activeImage={false}
          onActiveImage={() => console.log('activate image')}
        />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});
