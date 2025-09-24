import React from 'react';
import { render } from '@testing-library/react';
import Zone from './zone';
import SpecFriendly from '../../../../../spec-friendly';

describe('Zone', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <Zone
          selected={true}
          onSelectZone={() => console.log('select zone')}
          onDone={() => console.log('on done')}
          zone={'001'}
        />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});
