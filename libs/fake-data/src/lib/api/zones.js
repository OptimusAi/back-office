import faker from 'faker';

export const createZoneCategory = () => ({
  id: faker.random.uuid(),
  name: faker.address.streetSuffix(),
  description: faker.address.streetName(),
});

export const createZoneCity = () => ({
  id: faker.random.uuid(),
  city: 'Calgary',
  countrySubdivision: {
    name: 'ALBERTA',
    code: 'AB',
    countryCode: 'CA',
    country: 'Canada',
    regionType: 'PROVINCE',
  },
});

export const createZoneCategories = () => [
  {
    id: 1,
    name: 'On Street',
    description: faker.address.streetName(),
  },
  {
    id: 2,
    name: 'Parkade',
    description: faker.address.streetName(),
  },
  {
    id: 3,
    name: 'Residential',
    description: faker.address.streetName(),
  },
];

export const createZoneCities = () => [
  {
    id: 1,
    city: 'Calgary',
    countrySubdivision: {
      name: 'ALBERTA',
      code: 'AB',
      countryCode: 'CA',
      country: 'Canada',
      regionType: 'PROVINCE',
    },
  },
  {
    id: 2,
    city: 'Edmonton',
    countrySubdivision: {
      name: 'ALBERTA',
      code: 'AB',
      countryCode: 'CA',
      country: 'Canada',
      regionType: 'PROVINCE',
    },
  },
  {
    id: 3,
    city: 'Airdrie',
    countrySubdivision: {
      name: 'ALBERTA',
      code: 'AB',
      countryCode: 'CA',
      country: 'Canada',
      regionType: 'PROVINCE',
    },
  },
];

export const createZone = (body) => ({
  zone: body ? body.zoneNumber : faker.random.number({ min: 2000, max: 2999 }),
  address: body ? body.address : faker.address.streetAddress(),
  latitude: body ? body.latitude : faker.address.latitude(),
  longitude: body ? body.longitude : faker.address.latitude(),
  pairingTimeLimit: body
    ? body.pairingTimeLimit
    : faker.random.number({ min: 10, max: 60 }),
  zoneCategory: body ? body.zoneCategory : createZoneCategory(),
  city: body ? body.city : faker.random.arrayElement(createZoneCities()),
  arrivalGraceTime: body
    ? body.arrivalGraceTime
    : faker.random.arrayElement([0, 5, 10, 15, 20]),
  departureGraceTime: body
    ? body.departureGraceTime
    : faker.random.arrayElement([0, 5, 10, 15, 20]),
});

export const createZones = () =>
  [...Array(faker.random.number({ min: 1, max: 5 })).keys()].map((i) =>
    createZone()
  );

export const zoneUpdate = ({ body }) => body;

export const createdZones = [
  {
    zone: 2001,
    address: faker.address.streetAddress(),
    zoneCategory: {
      id: 1,
      name: 'On Street',
      description: faker.address.streetName(),
    },
    city: {
      id: 1,
      city: 'Calgary',
      countrySubdivision: {
        name: 'ALBERTA',
        code: 'AB',
        countryCode: 'CA',
        country: 'Canada',
        regionType: 'PROVINCE',
      },
    },
    pairingTimeLimit: 10,
    arrivalGraceTime: 10,
    departureGraceTime: 10,
  },  {
    zone: 2002,
    address: faker.address.streetAddress(),
    zoneCategory: {
      id: 2,
      name: 'Parkade',
      description: faker.address.streetName(),
    },
    city: {
      id: 1,
      city: 'Calgary',
      countrySubdivision: {
        name: 'ALBERTA',
        code: 'AB',
        countryCode: 'CA',
        country: 'Canada',
        regionType: 'PROVINCE',
      },
    },
    pairingTimeLimit: 10,
    arrivalGraceTime: 10,
    departureGraceTime: 10,
  },
];
