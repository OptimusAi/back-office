import React from 'react';
import { render } from '@testing-library/react';
import Infraction from './infraction';
import SpecFriendly from '../../../../../spec-friendly';
import { activeInfractionMock } from '../../../../../utils/test-utils/mocks';

describe('Infraction list item', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <Infraction
          activeInfraction={activeInfractionMock}
          selected={true}
          onSelectInfraction={() => console.log('select infraction')}
          infraction={activeInfractionMock}
        />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});
