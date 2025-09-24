import 'regenerator-runtime/runtime';
import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import SpecFriendly from '../../../spec-friendly';
import ZoneCategories from './zone-categories.container';

const mockStore = configureStore([]);

describe('Zone Categories Container', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      permissions: {
        permissions: ['ROLE_ADMIN'],
      },
      management: {
        zoneCategories: {
          ids: [1],
          entities: {
            1: {
              id: 1,
              name: 'parkplus-offstreet',
              description: 'Offstreet - PP',
            },
          },
          activeZoneCategoryId: '',
          error: null,
          bylawsList: [
            {
              id: '686a1b22-e026-493e-b6d3-cf5200910a21',
              code: '26M96',
              sectionCode: '9(14)',
              description: 'REMAIN IN A SPACE LONGER THAN TIME PURCHASED',
              externalReferenceId: '5409d759-7c90-4857-b4b6-0b151fe01965',
            },
          ],
          activeZoneCategoryBylaws: null,
          defaultBylaw: null
        },
        zones: {
          fetchedZoneCategories: true,
        },
        bylaws: {
          fetchedBylaws: true,
        },
      },
    });

    component = renderer.create(
      <SpecFriendly>
        <Provider store={store}>
          <ZoneCategories />
        </Provider>
      </SpecFriendly>
    );
  });

  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
