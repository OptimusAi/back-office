import React from 'react';
import { render } from '@testing-library/react';
import Busy from './busy';
describe('Busy', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Busy />);
    expect(baseElement).toBeTruthy();
  });
});
