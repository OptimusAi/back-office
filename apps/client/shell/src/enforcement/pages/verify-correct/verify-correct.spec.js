import 'regenerator-runtime/runtime';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import SpecFriendly from '../../../spec-friendly';
import VerifyCorrect from './verify-correct';
describe('Verify by zone', () => {
  it('should render successfully', () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <SpecFriendly>
        <VerifyCorrect />
      </SpecFriendly>
    );
    const result = renderer.getRenderOutput();
    expect(result).toBeTruthy();
  });
});

