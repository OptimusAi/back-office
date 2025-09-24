import 'regenerator-runtime/runtime';
import React from 'react';
import 'jest-canvas-mock';
import ShallowRenderer from 'react-test-renderer/shallow';
import SpecFriendly from '../../../spec-friendly';
import EnforcementProcess from './enforcement.process';

describe('Enforcement Process', () => {
  it('should render successfully', () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <SpecFriendly>
        <EnforcementProcess
          activeTab={0}
          onTabChange={() => 'change'}
        />
      </SpecFriendly>
    );
    const result = renderer.getRenderOutput();
    expect(result).toBeTruthy();
  });

});
