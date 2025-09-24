import 'regenerator-runtime/runtime';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import BylawManager from './bylaw.manager';
import SpecFriendly from '../../../spec-friendly';
describe('Bylaw Manager', () => {
  it('should render successfully', () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <SpecFriendly>
        <BylawManager bylaws={[]} onBylawsRequest={() => console.log('get bylaws')} />
      </SpecFriendly>
    );
    const result = renderer.getRenderOutput();
    expect(result).toBeTruthy();
  });
});