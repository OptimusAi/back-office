import faker from 'faker';

const createImage = () =>
  `https://picsum.photos/seed/${faker.random.number({
    min: 1,
    max: 400,
  })}/${faker.random.number({ min: 400, max: 800 })}`;

const createImages = (amount) => {
  return [
    {
      id: faker.random.uuid(),
      url: createImage(),
      deviceType: 'MOBILE',
      deviceId: faker.random.uuid(),
      observationId: faker.random.uuid(),
      imageType: 'PLATE',
      operatorName: 'cpa10956',
    },
    {
      id: faker.random.uuid(),
      url: createImage(),
      deviceType: 'MOBILE',
      deviceId: faker.random.uuid(),
      observationId: faker.random.uuid(),
      imageType: 'PROFILE',
      operatorName: 'cpa10956',
    },
    {
      id: faker.random.uuid(),
      url: createImage(),
      deviceType: 'MOBILE',
      deviceId: faker.random.uuid(),
      observationId: faker.random.uuid(),
      imageType: 'PROFILE',
      operatorName: 'cpa10956',
    },
  ];
};

export const createObservation = (date, plate, plateId, zoneNumber) => {
  let observedDate = date ? new Date(date) : new Date();
  let observation = {
    id: faker.random.uuid(),
    observedAt: observedDate.toISOString(),
    licencePlate: {
      licencePlateNumber: plate,
      id: plateId,
      countrySubdivision: {
        code: 'AB',
        countryCode: 'CA',
        country: 'Canada',
        regionType: 'PROVINCE',
      },
    },
    zone: zoneNumber,
    latitude: 51.044971,
    longitude: -114.066568,
    operatorName: 'cpa10956',
    eventType:'REALTIME',
    dot: 'W',
    photos: createImages(4),
  };
  return observation;
};

export const createLicensePlate = () =>
  faker.random.alphaNumeric(8).toUpperCase();

export const createZoneNumber = () =>
  faker.random.number({ min: 1000, max: 4000 });

export const createVerifiedObservation = ({
  date,
  plate,
  zoneNumber,
}) => ({
  id: faker.random.uuid(),
  observedAt: new Date(date).toISOString(),
  licencePlate: {
    licencePlateNumber: plate,
    countrySubdivision: {
      code: 'AB',
      countryCode: 'CA',
      country: 'Canada',
      regionType: 'PROVINCE',
    },
  },
  zone: zoneNumber ?? createZoneNumber(),
  latitude: 51.044971,
  longitude: -114.066568,
  operatorName: 'cpa10956',
  eventType: 'REALTIME',
  dot: 'W',
  photos: createImages(6),
});

export const createParkadeObservations = ({
  date,
  plate,
  zoneNumber,
  entryObservationId,
  exitObservationId,
  entryPhotoId,
  exitPhotoId
}) => {
  const entryDate = new Date(date);
  entryDate.setHours(faker.random.number({ min: 0, max: 4 }));
  const exitDate = new Date(entryDate);
  exitDate.setHours(entryDate.getHours() + 36);
  return [
    {
      id: entryObservationId,
      observedAt: entryDate.toISOString(),
      licencePlate: {
        licencePlateNumber: plate,
        countrySubdivision: {
          code: 'AB',
          countryCode: 'CA',
          country: 'Canada',
          regionType: 'PROVINCE',
        },
      },
      zone: zoneNumber ?? createZoneNumber(),
      latitude: 51.044971,
      longitude: -114.066568,
      operatorName: 'cpa10956',
      eventType: 'ENTRY',
      dot: 'W',
      photos: [{
        photoId: faker.random.uuid(),
        url: createImage(),
        deviceType: 'MOBILE',
        deviceId: faker.random.uuid(),
        observationId: faker.random.uuid(),
        imageType: 'PLATE',
        operatorName: 'cpa10956',
      },
      {
        photoId: entryPhotoId,
        url: createImage(),
        deviceType: 'MOBILE',
        deviceId: faker.random.uuid(),
        observationId: entryObservationId,
        imageType: 'REAR',
        operatorName: 'cpa10956',
      }],
    },
    {
      id: exitObservationId,
      observedAt: exitDate.toISOString(),
      licencePlate: {
        licencePlateNumber: plate,
        countrySubdivision: {
          code: 'AB',
          countryCode: 'CA',
          country: 'Canada',
          regionType: 'PROVINCE',
        },
      },
      zone: zoneNumber ?? createZoneNumber(),
      latitude: 51.044971,
      longitude: -114.066568,
      operatorName: 'cpa10956',
      eventType: 'EXIT',
      dot: 'W',
      photos: [{
        photoId: faker.random.uuid(),
        url: createImage(),
        deviceType: 'MOBILE',
        deviceId: faker.random.uuid(),
        observationId: faker.random.uuid(),
        imageType: 'PLATE',
        operatorName: 'cpa10956',
      },
      {
        photoId: exitPhotoId,
        url: createImage(),
        deviceType: 'MOBILE',
        deviceId: faker.random.uuid(),
        observationId: exitObservationId,
        imageType: 'REAR',
        operatorName: 'cpa10956',
      }]
    },
  ];
};
