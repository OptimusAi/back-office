import React from 'react';
import { render } from '@testing-library/react';
import InfractionDetails from './infraction.details';
import SpecFriendly from '../../../../../spec-friendly';
import {
  activeInfractionOnEnforce,
  zonesMock,
  licencePlateImage,
  regions,
} from '../../../../../utils/test-utils/mocks';

describe('Infraction Details at Enforce', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <InfractionDetails
          permissions={[]}
          activeInfraction={activeInfractionOnEnforce}
          originalActiveInfraction={activeInfractionOnEnforce}
          licencePlateImage={licencePlateImage}
          regions={regions}
          zones={zonesMock}
          onEditing={() => console.log('editing')}
        />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});
