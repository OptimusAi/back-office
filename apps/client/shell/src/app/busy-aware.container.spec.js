import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import 'jest-canvas-mock';
import configureStore from 'redux-mock-store';
import BusyAware from './busy-aware.container';

const mockStore = configureStore([]);
describe('Busy Aware Container', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      app: { busy: true, connected: true, client: '', error: false },
    });
    component = render(
      <Provider store={store}>
        <BusyAware />
      </Provider>
    );
  });

  it('should render with given state from Redux store', () => {
    expect(component).toMatchSnapshot();
  });
});
