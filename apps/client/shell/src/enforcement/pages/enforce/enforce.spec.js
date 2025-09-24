import 'regenerator-runtime/runtime';
import React from 'react';
import 'jest-canvas-mock';
import ShallowRenderer from 'react-test-renderer/shallow';
import SpecFriendly from '../../../spec-friendly';
import Enforce from './enforce';
describe('Enforce', () => {
  it('should render successfully', () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <SpecFriendly>
        <Enforce />
      </SpecFriendly>
    );
    const result = renderer.getRenderOutput();
    expect(result).toBeTruthy();
  });
});
