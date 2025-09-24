import 'regenerator-runtime/runtime';
import React from 'react';
import { StaticRouter } from 'react-router';
import ShallowRenderer from 'react-test-renderer/shallow';
import SpecFriendly from '../../spec-friendly';
import Page from './page';

const fakeClient = {
  id: 'fake-id-test-02',
  name: 'fake-name',
  externalClientId: 'test-client',
  primaryContactEmailAddress: 'test@test.com',
};
describe('Page', () => {
  it('should render successfully', () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <SpecFriendly>
        <StaticRouter>
          <Page
            title={'test'}
            clearClient={() => 'clear'}
            getClient={() => {
              'clientMock';
            }}
            client={fakeClient}
            children={<div>Test</div>}
          />
        </StaticRouter>
      </SpecFriendly>
    );
    const result = renderer.getRenderOutput();
    expect(result).toBeTruthy();
  });
});