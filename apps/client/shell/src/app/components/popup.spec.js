import React from 'react';
import { render } from '@testing-library/react';
import Popup from './popup';
import SpecFriendly from '../spec-friendly';

describe('Popup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <Popup
          message="this is an error message"
          type="error"
          open={true}
          onClearMessage={() => 'clear'}
        />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});
