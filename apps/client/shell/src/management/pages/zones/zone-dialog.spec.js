import React from 'react';
import { render } from '@testing-library/react';
import SpecFriendly from '../../../spec-friendly';
import ZoneDialog from './zone-dialog';

describe('Zones Dialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <ZoneDialog
          activeZoneId={1}
          closeDialog={() => console.log('close')}
          onDelete={() => console.log('on delete')}
        />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});
