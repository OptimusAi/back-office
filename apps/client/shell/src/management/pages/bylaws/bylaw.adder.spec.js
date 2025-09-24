import React from 'react';
import { render } from '@testing-library/react';
import SpecFriendly from "../../../spec-friendly";
import { bylawsMock } from '../../../utils/test-utils/mocks';
import BylawAdder from './bylaw.adder';

describe('Bylaw Adder', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <BylawAdder
          newBylaw={bylawsMock[0]}
          open={false}
          handleClose={() => console.log('handle close')}
          onBylawAdd={() => console.log('bylaw add')}
          onNewBylawUpdate={() => console.log('on new bylaw update')}
        />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});