// results.spec.js
export const licencePlatesMock = [
  {
    id: 1,
    number: 'TEST1',
    zones: [
      {
        id: '2003',
        infractions: [
          {
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
              countrySubdivision: {
                name: 'ALBERTA',
                code: 'AB',
                countryCode: 'CA',
                country: 'Canada',
                regionType: 'PROVINCE',
              },
              zoneId: '001',
              photos: [
                { url: 'http://fakeurl.com', imageType: 'PROFILE' },
                { url: 'http://fakeurl.com', imageType: 'PLATE' },
              ],
            },
          },
        ],
        sessions: [{ id: 1, start: '', end: '' }],
      },
    ],
  },
  {
    id: 2,
    number: 'TEST2',
    zones: [
      {
        id: '2003',
        infractions: [
          {
            id: 'testId02',
            observation: {
              id: 'testId02',
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
              countrySubdivision: {
                name: 'ALBERTA',
                code: 'AB',
                countryCode: 'CA',
                country: 'Canada',
                regionType: 'PROVINCE',
              },
              zoneId: '002',
              photos: [
                { url: 'http://fakeurl.com', imageType: 'PROFILE' },
                { url: 'http://fakeurl.com', imageType: 'PLATE' },
              ],
            },
          },
        ],
        sessions: [{ id: 2, start: '', end: '' }],
      },
    ],
  },
];

// licence-plate.details.spec
export const activeInfractionOnEnforce = {
  id: 3,
  licencePlate: {
    licencePlateNumber: 'TESTPLT',
    countrySubdivision: {
      name: 'ALBERTA',
      code: 'AB',
      countryCode: 'CA',
      country: 'Canada',
      regionType: 'PROVINCE',
    },
  },
  observations: [
    {
      zone: 1,
      observedAt: new Date(),
      eventType: 'REALTIME',
    },
  ],
  zone: 1,
  address: 'Test Address',
  enforcementPhotos: [
    { url: 'http://fakeurl.com', imageType: 'PROFILE', useToEnforce: true },
    { url: 'http://fakeurl.com', imageType: 'PLATE', useToEnforce: true },
  ],
};

export const licencePlateImage = {
  photoId: '0b06b9c2-4e87-4bb6-adab-1972a732faeb',
  observationId: '55cc15ef-92df-4d2d-9e24-3002d24e0fc0',
  infractionId: '8e5aa863-a9e3-4b17-9b2e-59cbb1cde8eb',
  imageType: 'PROFILE',
  useToEnforce: false,
  url: 'https://parkplus/images/',
};

export const regions = [
  {
    code: 'QC',
    country: 'Canada',
    countryCode: 'CA',
    name: 'Quebec',
    regionType: 'PROVINCE',
  },
  {
    code: 'FL',
    country: 'United States',
    countryCode: 'US',
    name: 'Florida',
    regionType: 'STATE',
  },
  {
    code: 'WA',
    country: 'United States',
    countryCode: 'US',
    name: 'Washington',
    regionType: 'STATE',
  },
  {
    code: 'AB',
    country: 'Canada',
    countryCode: 'CA',
    name: 'Alberta',
    regionType: 'PROVINCE',
  },
];

// licence-plate.container.spec
export const activeInfractionMock = {
  testId01: {
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
      zoneId: '001',
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
  },
};

export const activeParkadeInfractionMock = {
  id: 'testId01',
  observations: [
    {
      id: '1',
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
      eventType: 'EXIT',
      zone: '001',
      photos: [
        {
          photoId: '1',
          infractionId: 'testId01',
          observationId: '1',
          url: 'http://fakeurl.com',
          imageType: 'REAR',
          useToEnforce: true,
        },
        {
          photoId: '1a',
          infractionId: 'testId01',
          observationId: '1',
          url: 'http://fakeurl.com',
          imageType: 'PLATE',
          useToEnforce: true,
        },
      ],
    },
    {
      id: '2',
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
      eventType: 'ENTRY',
      zone: '001',
      photos: [
        {
          photoId: '2',
          infractionId: 'testId01',
          observationId: '2',
          url: 'http://fakeurl.com',
          imageType: 'REAR',
          useToEnforce: true,
        },
        {
          photoId: '2a',
          infractionId: 'testId01',
          observationId: '1',
          url: 'http://fakeurl.com',
          imageType: 'PLATE',
          useToEnforce: true,
        },
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
      photoId: '1',
      infractionId: 'testId01',
      observationId: '1',
      url: 'http://fakeurl.com',
      imageType: 'REAR',
      useToEnforce: true,
    },
    {
      photoId: '2',
      infractionId: 'testId01',
      observationId: '2',
      url: 'http://fakeurl.com',
      imageType: 'REAR',
      useToEnforce: true,
    },
    {
      photoId: '3',
      infractionId: 'testId01',
      observationId: '1',
      url: 'http://fakeurl.com',
      imageType: 'PLATE',
      useToEnforce: true,
    },
    {
      photoId: '4',
      infractionId: 'testId01',
      observationId: '2',
      url: 'http://fakeurl.com',
      imageType: 'PLATE',
      useToEnforce: true,
    },
  ],
  zone: '2003',
};

export const activeLicencePlateMock = {
  id: 1,
  number: 'TEST1',
  zones: [
    {
      id: '2003',
      infractions: [
        {
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
            countrySubdivision: {
              name: 'ALBERTA',
              code: 'AB',
              countryCode: 'CA',
              country: 'Canada',
              regionType: 'PROVINCE',
            },
            zoneId: '001',
            photos: [
              { url: 'http://fakeurl.com', imageType: 'PROFILE' },
              { url: 'http://fakeurl.com', imageType: 'PLATE' },
            ],
          },
        },
      ],
      sessions: [{ id: 1, start: '', end: '' }],
      permitSchedules: [
        { id: 1, effectiveDate: '', expiryDate: '', permit: { id: 1 } },
      ],
    },
  ],
};

// enforcement utils

export const permitMock = {
  id: '123abc',
  effectiveDate: '2022-01-01T07:00:00Z',
  expiryDate: '2023-01-01T07:00:00Z',
  licencePlate: 'ABC-123',
  zones: ['1001'],
  permit: {
    id: 'abc123',
    noOfStalls: 2,
    category: 'EXEMPT_VEHICLE',
    externalId: '123',
  },
  parkingSchedule: [
    { day: 'MONDAY', time: { start: '08:00:00', end: '18:00:00' } },
    { day: 'TUESDAY', time: { start: '08:00:00', end: '18:00:00' } },
    { day: 'WEDNESDAY', time: { start: '08:00:00', end: '18:00:00' } },
    { day: 'THURSDAY', time: { start: '08:00:00', end: '18:00:00' } },
    { day: 'FRIDAY', time: { start: '08:00:00', end: '18:00:00' } },
    { day: 'SATURDAY', time: { start: '00:00:00', end: '23:00:00' } },
    { day: 'SUNDAY', time: { start: '00:00:00', end: '23:00:00' } },
  ],
};

// ADMIN

export const loggedInUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'jd@test.com',
  authorities: ['ROLE_ADMIN'],
};

export const roles = [
  {
    authorities: [{ authority: 'ROLE_ADMIN' }],
    externalId: '110022',
    externalIdIssuer: 'test',
    id: '306',
  },
];

export const users = [
  { emailAdress: 'test@mail.com', id: '102', parkPlusUserId: '306' },
];

export const mappedUsers = [
  {
    id: '306',
    authorities: ['ROLE_ADMIN'],
    emailAdress: 'test@mail.com',
    parkPlusUserId: '306',
    userId: '102',
  },
];

// ZONES

export const zonesMock = [
  {
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
];

export const formattedZonesMock = [
  {
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
];

export const zoneCategoriesMock = [
  {
    id: 'z001',
    name: 'On Street',
    description: 'On Street Parking',
  },
];

export const mappedZoneCategoriesMock = [
  {
    id: 'z001',
    zoneCategory: 'On Street',
    description: 'On Street Parking',
  },
];

export const zoneCitiesMock = [
  {
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
];

export const updatedZoneMock = {
  id: 1,
  zone: 1,
  latitude: 80.40821857,
  longitude: -110.87463,
  pairingTimeLimit: 10,
  arrivalGraceTime: 10,
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
};

export const mappedZoneRowsMock = [
  {
    id: 1,
    zone: 1,
    zoneCity: 'Calgary',
    zoneCategory: 'On Street',
    pairingTimeLimit: 15,
    arrivalGraceTime: 5,
    departureGraceTime: 10,
  },
];

// BYLAWS

export const infractionBylaws = [
  {
    id: '2222',
    zoneCategoryId: '1dd2d96e',
    defaultBylaw: false,
    bylaw: {
      id: 222,
      code: 'test2',
      sectionCode: '9(21)',
      description: 'test2',
      externalReferenceId: 'eb222',
    },
  },
  {
    id: '1111',
    zoneCategoryId: '1dd2d96e',
    defaultBylaw: false,
    bylaw: {
      id: 111,
      code: 'test1',
      sectionCode: '1(13)',
      description: 'test1',
      externalReferenceId: 'eb111',
    },
  },
];

export const bylawsMock = [
  { id: 111, code: 'test1', sectionCode: 1, description: 'test1' },
  { id: 222, code: 'test2', sectionCode: 2, description: 'test2' },
];

export const mappedBylawsMock = [
  { id: 111, bylawCode: 'test1', sectionCode: 1, description: 'test1' },
  { id: 222, bylawCode: 'test2', sectionCode: 2, description: 'test2' },
];
