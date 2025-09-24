import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../theme-provider/theme-provider';
import Ribbon from './ribbon';
describe('Ribbon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ThemeProvider>
        <Ribbon />
      </ThemeProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
