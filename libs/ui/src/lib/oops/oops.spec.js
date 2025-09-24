import React from 'react';
import { render } from '@testing-library/react';
import Oops from './oops';
describe('Oops', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Oops />);
    expect(baseElement).toBeTruthy();
  });
});
