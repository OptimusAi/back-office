import React from 'react';
import { render } from '@testing-library/react';
import SpecFriendly from "../../../spec-friendly";
import { formattedZonesMock, zoneCategoriesMock, zoneCitiesMock } from '../../../utils/test-utils/mocks';
import ZoneEditor from './zone-editor';


describe('Zone Editor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <ZoneEditor
          zone={formattedZonesMock[0]}
          zoneCategoriesList={zoneCategoriesMock}
          zoneCitiesList={zoneCitiesMock}
          open={false}
          handleClose={() => console.log('handle close')}
          onZoneUpdate={() => console.log('zone update')}
        />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});