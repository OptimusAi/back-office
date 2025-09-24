import React from 'react';
import { render } from '@testing-library/react';
import InfractionsActions from './infraction-actions';
import SpecFriendly from '../../../../../spec-friendly';

const activeInfractionMock = {id: 3, observation: {id: 3, observedAt: new Date()}, status: 'UNVERIFIED'}
const updateMock = () => {console.log('mock Update')}

describe('InfractionsActions', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <InfractionsActions
          activeInfraction={activeInfractionMock}
          onStatusUpdate={updateMock}
        />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});