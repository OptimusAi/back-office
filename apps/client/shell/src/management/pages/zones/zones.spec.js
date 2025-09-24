import React from 'react';
import { render } from '@testing-library/react';
import Zones from './zones';
import SpecFriendly from "../../../spec-friendly";
import { formattedZonesMock, zoneCategoriesMock, zoneCitiesMock } from '../../../utils/test-utils/mocks';

describe('Zones', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <Zones
          zones={formattedZonesMock}
          zoneCategoriesList={zoneCategoriesMock}
          zoneCitiesList={zoneCitiesMock}
          onZonesRequest={() => console.log('on zones request')}
          onZoneCategoriesRequest={() => console.log('on zones categories request')}
          onZoneCitiesRequest={() => console.log('on zones cities request')}
          onSelectedZone={() => console.log('on selected zone')}
          activeZone={formattedZonesMock[0]}
          onZoneUpdate={() => console.log('on zones update')}
          onZoneAdd={() => console.log('on zone add')}
          activeZoneAdder={false}
          onAdd={() => 'open add modal'}
          permissions={[]}
        />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});