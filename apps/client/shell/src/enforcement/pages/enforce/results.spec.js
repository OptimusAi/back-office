import 'regenerator-runtime/runtime';
import React from 'react';
import 'jest-canvas-mock';
import ShallowRenderer from 'react-test-renderer/shallow';
import Results from './results';
import SpecFriendly from '../../../spec-friendly';
import licencePlateMock from '../../../utils/test-utils/mocks';
describe('Licence Plate Results', () => {
  it('should render successfully', () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <SpecFriendly>
        <Results licencePlates={licencePlateMock} />
      </SpecFriendly>
    );
    const result = renderer.getRenderOutput();
    expect(result).toBeTruthy();
  });
  it('should render No Results when no licence plates where found', () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <SpecFriendly>
        <Results licencePlates={[]} />
      </SpecFriendly>
    );
    const result = renderer.getRenderOutput();
    expect(result).toBeTruthy();
  });
});
