import 'regenerator-runtime/runtime';
import React from 'react';
import 'jest-canvas-mock';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import LicencePlate from './licence-plate.container';
import configureStore from 'redux-mock-store';
import SpecFriendly from '../../../../spec-friendly';
import {
  //updateInfractionEvent,
  //updateLicencePlate,
} from '../../../state/enforceable-infractions.slice';
import { zonesMock } from '../../../../utils/test-utils/mocks';

const mockStore = configureStore([]);

/* const activeInfractionMock = {
  testId01: {
    id: 'testId01',
    observations: [
      {
        id: 'testId',
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
}; */

describe('Licence Plate Container', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      app: {
        zones: {
          ids: [1],
          entities: { 1: { id: 1, zone: 1 } },
        },
        regions: {
          ids: [1],
          entities: { 1: { id: 1, code: 1, name: '1' } },
        },
      },
      permissions: {
        permissions: ['ROLE_ADMIN'],
      },
      enforcement: {
        enforceableInfractions: {
          busy: false,
          error: null,
          zones: zonesMock,
          ids: ['testId01', 'testId02'],
          entities: {
            testId01: {
              id: 'testId01',
              observations: [
                {
                  id: 'testId',
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
                  zone: 1,
                  photos: [
                    { url: 'http://fakeurl.com', imageType: 'PROFILE' },
                    { url: 'http://fakeurl.com', imageType: 'PLATE' },
                  ],
                },
              ],
              zone: 1,
              status: 'ENFORCEABLE',
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
            testId02: {
              id: 'testId02',
              observations: [
                {
                  id: 'testId02',
                  observedAt: new Date(),
                  licencePlate: {
                    licencePlateNumber: 'TEST2',
                    countrySubdivision: {
                      name: 'ALBERTA',
                      code: 'AB',
                      countryCode: 'CA',
                      country: 'Canada',
                      regionType: 'PROVINCE',
                    },
                  },
                  zone: 1,
                  photos: [
                    { url: 'http://fakeurl.com', imageType: 'PROFILE' },
                    { url: 'http://fakeurl.com', imageType: 'PLATE' },
                  ],
                },
              ],
              zone: 1,
              status: 'ENFORCEABLE',
              licencePlate: {
                licencePlateNumber: 'TEST2',
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
          activeInfractionId: 'testId01',
          activeLicencePlateId: 1,
          licencePlates: {
            ids: [1],
            entities: {
              1: {
                id: '1',
                number: 'TEST1',
                zones: [
                  {
                    id: '2003',
                    infractions: [
                      {
                        id: 'testId01',
                        observations: [
                          {
                            id: 'testId',
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
                            zone: 1,
                            photos: [
                              {
                                url: 'http://fakeurl.com',
                                imageType: 'PROFILE',
                              },
                              { url: 'http://fakeurl.com', imageType: 'PLATE' },
                            ],
                          },
                        ],
                        zone: 1,
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
                      },
                    ],
                    sessions: [{ id: 1, start: '', end: '' }],
                    permitSchedules: [],
                  },
                ],
              },
            },
          },
          searchDate: new Date(),
          regions: [{id: 1, code: 1, name: '1' }],
          availableBylaws: [
            {
              zoneNumber: '001',
              defaultBylaw: true,
              bylaw: {
                id: 1,
                code: '99534',
                description: '01957',
              },
            },
          ],
          plateRequestStatus: undefined,
          fetchedPlate: false
        },
      },
    });
    store.dispatch = jest.fn();

    component = renderer.create(
      <SpecFriendly>
        <Provider store={store}>
          <LicencePlate />
        </Provider>
      </SpecFriendly>
    );
  });

  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
/*   it('should dispatch UPDATE LICENCE PLATE', () => {
    const licencePlate = {
      licencePlateNumber: 'EDITED PLATE',
      countrySubdivision: {
        name: 'ALBERTA',
        code: 'AB',
        countryCode: 'CA',
        country: 'Canada',
        regionType: 'PROVINCE',
      },
    };

    renderer.act(() => {
      component.root
        .findByProps({ label: 'Licence Plate' })
        .props.onChange({ currentTarget: { value: 'EDITED PLATE' } });
    });

    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      updateLicencePlate({ id: 'testId01', licencePlate })
    );
  });

  it('should dispatch UPDATE INFRACTION EVENT', () => {
    const updatedInfraction = {
      id: 'testId01',
      observation: {
        id: 'testId',
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
        zone: 1,
        photos: [
          { url: 'http://fakeurl.com', imageType: 'PROFILE' },
          { url: 'http://fakeurl.com', imageType: 'PLATE' },
        ],
      },
      status: 'ENFORCEABLE',
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
    };

    renderer.act(() => {
      component.root
        .findByProps({ 'data-testid': 'ignoreButton' })
        .props.onClick(activeInfractionMock, 'REJECT');
    });

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(
      updateInfractionEvent({
        activeInfractionId: updatedInfraction.id,
        event: 'REJECT',
      })
    );
  }); */
});
