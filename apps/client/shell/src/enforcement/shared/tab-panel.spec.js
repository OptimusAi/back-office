import React from 'react';
import 'jest-canvas-mock';
import { render } from '@testing-library/react';
import SpecFriendly from '../../../src/spec-friendly';
import TabPanel from './tab-panel';
import { Tabs, Tab } from '@material-ui/core';

describe('Tab Panel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SpecFriendly>
        <Tabs value={0} onChange={() => { console.log('change')}} indicatorColor="primary">
          <Tab label='testTab' />
        </Tabs>
        <TabPanel value={0} index={0} >
          <div>{'test'}</div>
        </TabPanel>
      </SpecFriendly>
    );
    expect(baseElement).toBeTruthy();
  });
});