import React from 'react';
import { render } from '@testing-library/react';
import SpecFriendly from '../../../../../spec-friendly';
import InfractionToolbar from '../infraction/infraction-toolbar';

describe('Infraction toolbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <InfractionToolbar
          zone={'001'}
          selected={true}
          setFilterBy={() => console.log('set filter')}
          removeFilter={() => console.log('remove filter')}
        />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});
