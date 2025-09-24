import React from 'react';
import { render } from '@testing-library/react';
import SpecFriendly from "../../../spec-friendly";
import { bylawsMock } from '../../../utils/test-utils/mocks';
import BylawEditor from './bylaw.editor';

describe('Bylaw Editor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <BylawEditor
          activeBylaw={bylawsMock[0]}
          open={false}
          handleClose={() => console.log('handle close')}
          onBylawUpdate={() => console.log('bylaw update')}
        />
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});