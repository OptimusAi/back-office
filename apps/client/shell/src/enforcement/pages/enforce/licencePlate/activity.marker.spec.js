import React from 'react';
import { render } from '@testing-library/react';
import ActivityMarker from './activity.marker';

describe('Activity Marker', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ActivityMarker e={{}} timeScale={() => 'timeScale'} y={2} />
    );
    expect(baseElement).toBeTruthy();
  });
});
