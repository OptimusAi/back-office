import faker from 'faker';
import {
  createObservation,
  createParkadeObservations,
  createVerifiedObservation,
} from './observations';
import { createdZones } from './zones';

const createImage = () =>
  `https://picsum.photos/seed/${faker.random.number({
    min: 1,
    max: 400,
  })}/${faker.random.number({ min: 400, max: 800 })}`;

export const createInfraction = (id, date, status, plate, zoneNumber) => ({
  id: id || faker.random.uuid(),
  observations: [
    ...Array(faker.random.number({ min: 1, max: 2 })).keys(),
  ].map(() => createObservation(date)),
  status: status || 'UNVERIFIED',
  bylaw: faker.random.number({ min: 1, max: 4 }).toString(),
  zone: zoneNumber || {
    zone: faker.random.arrayElement(createdZones).zone,
    address: faker.address.streetAddress(),
  },
  licencePlate: {
    id: faker.random.uuid(),
    licencePlateNumber: plate || 'ZZ-T0PP',
    countrySubdivision: {
      countryCode: 'CA',
      code: 'AB',
      country: 'Canada',
      regionType: 'PROVINCE',
    },
  },
  enforcementPhotos: [
    {
      photoId: faker.random.uuid(),
      useToEnforce: true,
      infractionId: faker.random.uuid(),
      imageType: 'PROFILE',
      deviceType: 'Fixed',
      deviceId: 'PP-GG ParkPlus-QG-ER',
      operatorName: 'cpa10956',
      url: createImage(),
    },
    {
      photoId: faker.random.uuid(),
      useToEnforce: true,
      infractionId: faker.random.uuid(),
      imageType: 'PROFILE',
      deviceType: 'Fixed',
      deviceId: 'PP-GG ParkPlus-QG-ER',
      operatorName: 'cpa10956',
      url: createImage(),
    },
    {
      photoId: faker.random.uuid(),
      useToEnforce: true,
      infractionId: faker.random.uuid(),
      imageType: 'PROFILE',
      deviceType: 'Fixed',
      deviceId: 'PP-GG ParkPlus-QG-ER',
      operatorName: 'cpa10956',
      url: createImage(),
    },
    {
      photoId: faker.random.uuid(),
      useToEnforce: true,
      infractionId: faker.random.uuid(),
      imageType: 'PLATE',
      deviceType: 'Fixed',
      deviceId: 'PP-GG ParkPlus-QG-ER',
      operatorName: 'cpa10956',
      url: createImage(),
    },
  ],
});

const getInfractionStatusByEvent = (event) => {
  if (event === 'VERIFY') {
    return 'VERIFIED';
  }
  if (event === 'IGNORE') {
    return 'IGNORED';
  }
  if (event === 'REVERIFY') {
    return 'REVERIFIED';
  }
};

export const createCustomInfraction = (infractionId, { body }) => {
  return {
    id: infractionId,
    observations: [createObservation()],
    status: getInfractionStatusByEvent(body.event) || 'UNVERIFIED',
    zone: {
      zone: body.zone,
      address: faker.address.streetAddress(),
    },
    licencePlate: body.licencePlate || {
      licencePlateNumber: 'ZZ-T0PP',
      id: faker.random.uuid(),
      countrySubdivision: {
        countryCode: 'CA',
        code: 'AB',
        country: 'Canada',
        regionType: 'PROVINCE',
      },
    },
    enforcementPhotos: body.enforcementPhotos || [
      {
        photoId: faker.random.uuid(),
        useToEnforce: true,
        infractionId: faker.random.uuid(),
        imageType: 'PROFILE',
        deviceType: 'Fixed',
        deviceId: 'PP-GG ParkPlus-QG-ER',
        operatorName: 'cpa10956',
        url: createImage(),
      },
      {
        photoId: faker.random.uuid(),
        useToEnforce: true,
        infractionId: faker.random.uuid(),
        imageType: 'PROFILE',
        deviceType: 'Fixed',
        deviceId: 'PP-GG ParkPlus-QG-ER',
        operatorName: 'cpa10956',
        url: createImage(),
      },
      {
        photoId: faker.random.uuid(),
        useToEnforce: true,
        infractionId: faker.random.uuid(),
        imageType: 'PLATE',
        deviceType: 'Fixed',
        deviceId: 'PP-GG ParkPlus-QG-ER',
        operatorName: 'cpa10956',
        url: createImage(),
      },
    ],
  };
};

export const createClient = (clientId) => ({
  id: clientId,
  name: faker.company.companyName(),
  externalClientId: 'test-client',
  primaryContactEmailAddress: faker.internet.email(),
});

export const getCountrySubdivisions = () => {
  let regions = [
    {
      name: 'Alberta',
      code: 'AB',
      countryCode: 'CA',
      country: 'Canada',
      regionType: 'Province',
    },
    {
      name: 'British Columbia',
      code: 'BC',
      countryCode: 'CA',
      country: 'Canada',
      regionType: 'Province',
    },
    {
      name: 'Manitoba',
      code: 'MB',
      countryCode: 'CA',
      country: 'Canada',
      regionType: 'Province',
    },
  ];
  return regions;
};

export const sendToEnforce = (infractions, date) => {
  let potentialInfractions = [...infractions];
  let updatedInfractions = potentialInfractions.map((i) => {
    let updatedInfraction = {
      id: i.infractionId,
      status: 'ENFORCEABLE',
      ...i,
    };

    delete updatedInfraction.event;
    return updatedInfraction;
  });
  return updatedInfractions;
};

export const createVerifiedInfraction = ({
  date,
  plate,
  plateId,
  province,
  zoneCategory,
  zoneNumber,
}) => ({
  id: faker.random.uuid(),
  state: 'ENFORCEABLE',
  bylaw: null,
  zone: zoneNumber,
  address: faker.address.streetAddress(),
  observations: [
    createVerifiedObservation({
      date,
      plate,
      province,
      zoneCategory,
      zoneNumber,
    }),
  ],
  licencePlate: {
    id: plateId,
    licencePlateNumber: plate,
    countrySubdivision: {
      countryCode: 'CA',
      code: 'AB',
      country: 'Canada',
      regionType: 'PROVINCE',
    },
  },
  enforcementPhotos: [
    {
      photoId: faker.random.uuid(),
      useToEnforce: true,
      infractionId: faker.random.uuid(),
      imageType: 'PROFILE',
      deviceType: 'Fixed',
      deviceId: 'PP-GG ParkPlus-QG-ER',
      operatorName: 'cpa10956',
      url: createImage(),
    },
    {
      photoId: faker.random.uuid(),
      useToEnforce: true,
      infractionId: faker.random.uuid(),
      imageType: 'PROFILE',
      deviceType: 'Mobile',
      deviceId: 'PP-GG ParkPlus-QG-ER',
      operatorName: 'cpa10956',
      url: createImage(),
    },
    {
      photoId: faker.random.uuid(),
      useToEnforce: true,
      infractionId: faker.random.uuid(),
      imageType: 'PROFILE',
      deviceType: 'Mobile',
      deviceId: 'PP-GG ParkPlus-QG-ER',
      operatorName: 'cpa10956',
      url: createImage(),
    },
    {
      photoId: faker.random.uuid(),
      useToEnforce: true,
      infractionId: faker.random.uuid(),
      imageType: 'PLATE',
      deviceType: 'Mobile',
      deviceId: 'PP-GG ParkPlus-QG-ER',
      operatorName: 'cpa10956',
      url: createImage(),
    },
  ],
});
export const createParkadeInfraction = ({
  date,
  plate,
  plateId,
  zoneNumber,
}) => {
  const infractionId = faker.random.uuid();
  const entryObservationId = faker.random.uuid();
  const exitObservationId = faker.random.uuid();
  const entryPhotoId = faker.random.uuid();
  const exitPhotoId = faker.random.uuid();

  return {
    id: infractionId,
    state: 'ENFORCEABLE',
    bylaw: null,
    zone: zoneNumber,
    address: faker.address.streetAddress(),
    observations: createParkadeObservations({
      date,
      plate,
      zoneNumber,
      entryObservationId,
      exitObservationId,
      entryPhotoId,
      exitPhotoId,
    }),
    licencePlate: {
      id: plateId,
      licencePlateNumber: plate,
      countrySubdivision: {
        countryCode: 'CA',
        code: 'AB',
        country: 'Canada',
        regionType: 'PROVINCE',
      },
    },
    enforcementPhotos: [
      {
        photoId: faker.random.uuid(),
        useToEnforce: true,
        infractionId: faker.random.uuid(),
        imageType: 'PLATE',
        deviceType: 'Mobile',
        deviceId: 'PP-GG ParkPlus-QG-ER',
        operatorName: 'cpa10956',
        url: createImage(),
        observationId: faker.random.uuid(),
      },
      {
        photoId: entryPhotoId,
        useToEnforce: true,
        infractionId,
        imageType: 'REAR',
        deviceType: 'Mobile',
        deviceId: 'PP-GG ParkPlus-QG-ER',
        operatorName: 'cpa10956',
        url: createImage(),
        observationId: entryObservationId,
      },
      {
        photoId: exitPhotoId,
        useToEnforce: true,
        infractionId,
        imageType: 'REAR',
        deviceType: 'Mobile',
        deviceId: 'PP-GG ParkPlus-QG-ER',
        operatorName: 'cpa10956',
        url: createImage(),
        observationId: exitObservationId,
      },
    ],
  };
};

export const getInfractionBylaws = (zoneNumber) => {
  let bylaws = [
    {
      zoneNumber: zoneNumber,
      defaultBylaw: false,
      bylaw: {
        id: faker.random.uuid(),
        code: '34523',
        description: '73283',
        sectionCode: '34523',
      },
    },
    {
      zoneNumber: zoneNumber,
      defaultBylaw: true,
      bylaw: {
        id: faker.random.uuid(),
        code: '99534',
        description: '01957',
        sectionCode: '99534',
      },
    },
    {
      zoneNumber: zoneNumber,
      defaultBylaw: false,
      bylaw: {
        id: faker.random.uuid(),
        code: '11284',
        description: '50294',
        sectionCode: '11284',
      },
    },
  ];
  return bylaws;
};

export const processInfractions = (body) => {
  if (body) {
    return body;
  }
};

export const completeZone = (body) => {
  return 'SUCCESS';
};

export const releaseInfraction = (zoneNumber, body) => {
  return `Infraction ${body.infractionId} released from queue`;
};
