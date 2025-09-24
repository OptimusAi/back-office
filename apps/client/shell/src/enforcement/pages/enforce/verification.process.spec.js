import 'regenerator-runtime/runtime';
import React from 'react';
import 'jest-canvas-mock';
import ShallowRenderer from 'react-test-renderer/shallow';
import SpecFriendly from '../../../spec-friendly';
import VerificationProcess from './verification.process';

describe('Verification Process', () => {
  it('should render successfully', () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <SpecFriendly>
        <VerificationProcess
          activeTab={0}
          onTabChange={() => 'change'}
        />
      </SpecFriendly>
    );
    const result = renderer.getRenderOutput();
    expect(result).toBeTruthy();
  });

});