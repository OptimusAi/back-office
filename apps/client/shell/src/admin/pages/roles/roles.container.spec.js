import 'regenerator-runtime/runtime';
import React from 'react';
import 'jest-canvas-mock';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import SpecFriendly from '../../../spec-friendly';
import Roles from './roles.container';

const mockStore = configureStore([]);
describe('Roles container', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      admin: {
        users: {
          ids: ['9765c0d4-e7b8-48ea-9b19-e414a39d4189'],
          entities: {
            '9765c0d4-e7b8-48ea-9b19-e414a39d4189': {
              id: '9765c0d4-e7b8-48ea-9b19-e414a39d4189',
              parkPlusUserId: '9765c0d4-e7b8-48ea-9b19-e414a39d4189',
              emailAddress: 'cpatest5500@gmail.com',
              userId: 'f245f98c-7c08-467e-bdef-d61e68ce1d02',
              authorities: [
                'ROLE_ADMIN',
                'ROLE_ENFORCEMENT',
                'ROLE_VERIFICATION',
              ],
            },
          },
          busy: false,
          error: null,
          activeUserAdder: false,
          activeRole: null,
        },
      },
    });

    component = renderer.create(
      <SpecFriendly>
        <Provider store={store}>
          <Roles />
        </Provider>
      </SpecFriendly>
    );
  });

  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
