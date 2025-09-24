import 'regenerator-runtime/runtime';
import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import Bylaws from './bylaws.container';
import configureStore from 'redux-mock-store';
import SpecFriendly from '../../../spec-friendly';

const mockStore = configureStore([]);

describe('Bylaws Container', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      permissions: {
        permissions: [],
      },
      management: {
        bylaws: {
          ids: [1],
          entities: {
            1: {
              id: 1,
              code: '1',
              sectionCode: '9(1)',
              description: 'test',
              externalReferenceId: '1',
            },
          },
          activeBylawId: 1,
          error: null,
          activeBylawEditor: false,
          activeBylawAdder: false,
          newBylaw: null,
          fetchedBylaws: true,
        },
      },
    });

    component = renderer.create(
      <SpecFriendly>
        <Provider store={store}>
          <Bylaws />
        </Provider>
      </SpecFriendly>
    );
  });

  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
