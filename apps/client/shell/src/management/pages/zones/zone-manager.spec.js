import 'regenerator-runtime/runtime';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ZoneManager from './zone-manager';
import SpecFriendly from '../../../spec-friendly';
describe('Zone Manager', () => {
  it('should render successfully', () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <SpecFriendly>
        <ZoneManager zones={[]} onZonesRequest={() => console.log('get zones')} />
      </SpecFriendly>
    );
    const result = renderer.getRenderOutput();
    expect(result).toBeTruthy();
  });
});