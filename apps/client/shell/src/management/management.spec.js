import 'regenerator-runtime/runtime';
import React from 'react';
import 'jest-canvas-mock';
import ShallowRenderer from 'react-test-renderer/shallow';
import Management from './management';
import SpecFriendly from '../spec-friendly';

describe('Management', () => {
  it('should render successfully', () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <SpecFriendly>
        <Management />
      </SpecFriendly>
    );
    const result = renderer.getRenderOutput();
    expect(result).toBeTruthy();
  });
});
