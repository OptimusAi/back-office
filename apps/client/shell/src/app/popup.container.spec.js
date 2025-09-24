import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import 'jest-canvas-mock';
import configureStore from 'redux-mock-store';
import Popup from './popup.container';
import SpecFriendly from '../spec-friendly';

const mockStore = configureStore([]);
describe('Pop up Container', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      app: {
        management: {
          zones: { error: { message: 'Error', type: 'error', open: true } },
          zoneCategories: {
            error: { message: 'Error', type: 'error', open: true },
          },
          bylaws: {
            error: { message: 'Error', type: 'error', open: true },
          },
          enforcement: {
            infractionsByZone: {
              error: { message: 'Error', type: 'error', open: true },
            },
          },
        },
        error: { message: 'Error', type: 'error', open: true },
      },
    });
    component = render(
      <SpecFriendly>
        <Provider store={store}>
          <Popup />
        </Provider>
      </SpecFriendly>
    );
  });

  it('should render with given state from Redux store', () => {
    expect(component).toMatchSnapshot();
  });
});
