import 'regenerator-runtime/runtime';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ZoneManager from './zone-categories-manager';
import SpecFriendly from '../../../spec-friendly';
describe('Zone Manager', () => {
  it('should render successfully', () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <SpecFriendly>
        <ZoneManager zoneCategories={[]} onZoneCategoriesRequest={() => console.log('get zone categories')} />
      </SpecFriendly>
    );
    const result = renderer.getRenderOutput();
    expect(result).toBeTruthy();
  });
});