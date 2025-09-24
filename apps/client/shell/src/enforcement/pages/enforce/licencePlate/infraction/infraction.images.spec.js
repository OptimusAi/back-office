import React from 'react';
import { render } from '@testing-library/react';
import InfractionImages from './infraction.images';
import SpecFriendly from '../../../../../spec-friendly';

const images = [
  {
    id: '1',
    src: 'https://fakesitefortestingimage.com',
    deviceType: 'MOBILE',
    deviceId: '123-abc',
    observationId: '456-def',
    imageType: 'PLATE',
    operatorName: 'cpa10956',
    useToEnforce: true,
  },
  {
    id: '2',
    src: 'https://fakesitefortestingimages.com',
    deviceType: 'MOBILE',
    deviceId: '123-abc',
    observationId: '456-def',
    imageType: 'PROFILE',
    operatorName: 'cpa10956',
    useToEnforce: true,
  },
];

describe('Infraction images at enforce', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <InfractionImages images={images} permissions={[]} />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});
