import 'jest-canvas-mock';
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SpecFriendly from '../spec-friendly';
import { zonesMock } from '../utils/test-utils/mocks';
import Enforcement from './enforcement.container';

const mockStore = configureStore([]);
describe('Enforcement container', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      permissions: { permissions: ['ROLE_ADMIN'] },
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
          <Enforcement />
        </Provider>
      </SpecFriendly>
    );
  });

  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
