import React from 'react';
import { render } from '@testing-library/react';
import SpecFriendly from "../../../spec-friendly";
import { formattedZonesMock, zoneCategoriesMock, zoneCitiesMock } from '../../../utils/test-utils/mocks';
import ZoneAdder from './zone-adder';

describe('Zone Adder', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <ZoneAdder
          zone={formattedZonesMock[0]}
          zoneCategoriesList={zoneCategoriesMock}
          zoneCitiesList={zoneCitiesMock}
          open={false}
          handleClose={() => console.log('handle close')}
          onZoneAdd={() => console.log('zone add')}
        />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});