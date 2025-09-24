import React from 'react';
import { render } from '@testing-library/react';
import InfractionStatusIcon from './infraction-status-icon';
import SpecFriendly from '../../../../../spec-friendly';
import { infractionStatus } from '../../../../enforcement.enums';

describe('Infraction Status Icon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <InfractionStatusIcon
          status={infractionStatus.unverified}
        />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});