import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import SearchBar from './search-bar.container';
import configureStore from 'redux-mock-store';
import SpecFriendly from '../../../spec-friendly';
import { zonesMock } from '../../../utils/test-utils/mocks';

const mockStore = configureStore([]);
describe('Search Bar Container at Enforce tab', () => {
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
          ids: [1],
          entities: { 1: { id: 1 } },
        },
      },
      enforcement: {
        enforceableInfractions: {
          busy: false,
          error: null,
          activeInfractionId: '',
          activeLicencePlateId: '',
          licencePlates: {
            ids: [],
            entities: {},
          },
          searchDate: null,
        },
      },
    });

    store.dispatch = jest.fn();

    component = renderer.create(
      <SpecFriendly>
        <Provider store={store}>
          <SearchBar />
        </Provider>
      </SpecFriendly>
    );
  });

  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
