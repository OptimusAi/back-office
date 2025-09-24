import 'regenerator-runtime/runtime';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Results from './results';
import SpecFriendly from '../../../../spec-friendly';
import { zonesMock, activeInfractionMock } from './../../../../utils/test-utils/mocks';

describe('Results', () => {
  it('should render successfully when results where found', () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <SpecFriendly>
        <Results
          zones={zonesMock}
          activeInfraction={activeInfractionMock}
          onEventUpdate={() => console.log('event update')}
          activeImageViewer={false}
        />
      </SpecFriendly>
    );
    const result = renderer.getRenderOutput();
    expect(result).toBeTruthy();
  });
});