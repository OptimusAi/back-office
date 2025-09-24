import React from 'react';
import { render } from '@testing-library/react';
import SpecFriendly from '../../../spec-friendly';
import ZoneCategoriesDialog from './zone-categories-dialog';

describe('Zone Categories Dialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <ZoneCategoriesDialog
          activeZoneCategory={{ id: 1, name: 'test' }}
          closeDialog={() => console.log('close')}
          onDelete={() => console.log('on delete')}
        />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});
