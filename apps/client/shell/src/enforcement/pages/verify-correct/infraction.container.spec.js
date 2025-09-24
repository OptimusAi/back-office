import 'regenerator-runtime/runtime';
import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import Infraction from './infraction.container';
import configureStore from 'redux-mock-store';
import SpecFriendly from '../../../spec-friendly';
import { zonesMock } from '../../../utils/test-utils/mocks';

const mockStore = configureStore([]);
describe('Infraction Container', () => {
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
      permissions: {
        permissions: ['ROLE_ADMIN'],
      },
      enforcement: {
        infractions: {
          busy: false,
          error: null,
          ids: ['test1'],
          zones: {
            ids: [1],
            entities: { 1: zonesMock[0] },
          },
          zonesList: zonesMock,
          entities: {
            test1: {
              id: 'test1',
              observations: [
                {
                  id: 'test1',
                  observedAt: new Date(),
                  licencePlate: {
                    licencePlateNumber: 'TEST1',
                    countrySubdivision: {
                      name: 'ALBERTA',
                      code: 'AB',
                      countryCode: 'CA',
                      country: 'Canada',
                      regionType: 'PROVINCE',
                    },
                  },
                  zone: '001',
                  photos: [
                    { url: 'http://fakeurl.com', imageType: 'PROFILE' },
                    { url: 'http://fakeurl.com', imageType: 'PLATE' },
                  ],
                },
              ],
              status: 'ENFORCEABLE',
              zone: {
                zone: '1',
              },
              licencePlate: {
                licencePlateNumber: 'TEST1',
                countrySubdivision: {
                  name: 'ALBERTA',
                  code: 'AB',
                  countryCode: 'CA',
                  country: 'Canada',
                  regionType: 'PROVINCE',
                },
              },
              enforcementPhotos: [
                {
                  url: 'http://fakeurl.com',
                  imageType: 'PROFILE',
                  useToEnforce: true,
                },
                {
                  url: 'http://fakeurl.com',
                  imageType: 'PLATE',
                  useToEnforce: true,
                },
              ],
            },
          },
          activeInfractionId: 'test1',
          searchDate: null,
          activeImageViewer: false,
          activeImage: -1,
          originalActiveInfraction: null,
          activeInfraction: {
            id: 'test1',
            observations: [
              {
                id: 'test1',
                observedAt: new Date(),
                licencePlate: {
                  licencePlateNumber: 'TEST1',
                  countrySubdivision: {
                    name: 'ALBERTA',
                    code: 'AB',
                    countryCode: 'CA',
                    country: 'Canada',
                    regionType: 'PROVINCE',
                  },
                },
                zone: '001',
                photos: [
                  { url: 'http://fakeurl.com', imageType: 'PROFILE' },
                  { url: 'http://fakeurl.com', imageType: 'PLATE' },
                ],
              },
            ],
            status: 'ENFORCEABLE',
            zone: {
              zone: '1',
            },
            licencePlate: {
              licencePlateNumber: 'TEST1',
              countrySubdivision: {
                name: 'ALBERTA',
                code: 'AB',
                countryCode: 'CA',
                country: 'Canada',
                regionType: 'PROVINCE',
              },
            },
            enforcementPhotos: [
              {
                url: 'http://fakeurl.com',
                imageType: 'PROFILE',
                useToEnforce: true,
              },
              {
                url: 'http://fakeurl.com',
                imageType: 'PLATE',
                useToEnforce: true,
              },
            ],
          },
          isEditing: false,
        },
      },
    });

    component = renderer.create(
      <SpecFriendly>
        <Provider store={store}>
          <Infraction />
        </Provider>
      </SpecFriendly>
    );
  });

  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
