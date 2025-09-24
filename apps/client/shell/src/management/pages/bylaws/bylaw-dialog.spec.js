import React from 'react';
import { render } from '@testing-library/react';
import SpecFriendly from '../../../spec-friendly';
import BylawDialog from './bylaw-dialog';

describe('Bylaw Dialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <BylawDialog
          activeBylaw={1}
          closeDialog={() => console.log('close')}
          onDelete={() => console.log('on delete')}
        />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});
