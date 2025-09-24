import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import Results from './results.container';
import configureStore from 'redux-mock-store';
import SpecFriendly from '../../../spec-friendly';
import { zonesMock, regions } from '../../../utils/test-utils/mocks';

const mockStore = configureStore([]);
describe('Results Container at Verify & Correct tab', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      app: {
        zones: {
          ids: [1],
          entities: { 1: { id: 1, ...zonesMock[0] } },
        },
        regions: {
          ids: ['AB'],
          entities: {
            0: {
              id: 'AB',
              ...regions[0],
            },
          },
        },
      },
      enforcement: {
        infractions: {
          busy: false,
          error: null,
          activeInfraction: null,
          zones: {
            ids: [],
            entities: {},
          },
          searchDate: null,
          activeImageViewer: false,
          isEditing: false,
        },
      },
      permissions: {
        isLoaded: true,
        permissions: ['ROLE_VERIFICATION'],
      },
    });

    store.dispatch = jest.fn();

    component = renderer.create(
      <SpecFriendly>
        <Provider store={store}>
          <Results />
        </Provider>
      </SpecFriendly>
    );
  });

  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
