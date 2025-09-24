import React from 'react';
import { render } from '@testing-library/react';
import ZonesToolbar from './zones-toolbar';
import SpecFriendly from '../../../../../spec-friendly';

describe('Zone toolbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <ZonesToolbar
          status={1}
          onZoneFilterSelect={() => console.log('select filter')}
          onSendToEnforce={() => console.log('send to enforce')}
          zoneFilter={1}
        />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});
