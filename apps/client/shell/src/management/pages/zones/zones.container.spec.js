import 'regenerator-runtime/runtime';
import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import Zones from './zones.container';
import configureStore from 'redux-mock-store';
import SpecFriendly from '../../../spec-friendly';

const mockStore = configureStore([]);

describe('Zones Container', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      app: {
        zones: {
          ids: [1],
          entities: {
            1: {
              id: 1,
              zone: 1,
              latitude: 80.40821857,
              longitude: -110.87463,
              pairingTimeLimit: 15,
              arrivalGraceTime: 5,
              departureGraceTime: 10,
              zoneCategory: {
                id: 'z001',
                name: 'On Street',
                description: 'On street parking',
              },
              city: {
                id: '1',
                city: 'Calgary',
                countrySubdivision: {
                  name: 'ALBERTA',
                  code: 'AB',
                  countryCode: 'CA',
                  country: 'Canada',
                  regionType: 'PROVINCE',
                },
              },
            },
          },
        },
      },
      management: {
        zones: {
          activeZoneId: 1,
          zoneCategoriesList: [{ id: 1 }],
          zoneCitiesList: [{ id: 1 }],
        },
      },
      permissions: {
        permissions: [],
      },
    });

    component = renderer.create(
      <SpecFriendly>
        <Provider store={store}>
          <Zones />
        </Provider>
      </SpecFriendly>
    );
  });

  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
