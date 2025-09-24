import React from 'react';
import { render } from '@testing-library/react';
import ZoneStatusIcon from './zone-status-icon';
import SpecFriendly from '../../../../../spec-friendly';

describe('Zone status icon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <ZoneStatusIcon
          status={1}
        />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});
