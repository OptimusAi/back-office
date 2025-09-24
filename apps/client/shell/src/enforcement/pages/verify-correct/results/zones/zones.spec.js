import React from 'react';
import { render } from '@testing-library/react';
import Zones from './zones';
import SpecFriendly from '../../../../../spec-friendly';
import { zonesMock } from '../../../../../utils/test-utils/mocks';

describe('Zone', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <Zones
          permissions={[]}
          zones={zonesMock}
          activeZone={'001'}
          onSelectZone={() => console.log('select zone')}
          onSendToEnforce={() => console.log('send to enforce')}
          onZoneFilterSelect={() => console.log('select filter')}
          onRelease={() => console.log('release')}
        />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});

