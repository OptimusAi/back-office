import 'regenerator-runtime/runtime';
import React from 'react';
import 'jest-canvas-mock';
import ShallowRenderer from 'react-test-renderer/shallow';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import SpecFriendly from '../spec-friendly';

describe('App', () => {
  it('should render successfully', () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <BrowserRouter>
        <SpecFriendly>
          <App />
        </SpecFriendly>
      </BrowserRouter>
    );
    const result = renderer.getRenderOutput();
    expect(result).toBeTruthy();
  });
});