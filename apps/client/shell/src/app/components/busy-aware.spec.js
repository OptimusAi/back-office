import React from 'react';
import { render } from '@testing-library/react';
import BusyAware from './busy-aware';

describe('Busy Aware Component', () => {
  it('should render successfully when busy prop is true', () => {
    const { baseElement } = render(<BusyAware busy />);
    expect(baseElement).toBeTruthy();
  });
});
