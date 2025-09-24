import faker from 'faker';
import { createLicensePlate } from './observations';
import {
  createParkadeInfraction,
  createVerifiedInfraction,
} from './infractions';
import { createdZones } from './zones';

const createParkingSession = ({ start, duration }) => {
  const end = new Date(start);
  end.setHours(start.getHours() + duration);
  return {
    id: faker.random.uuid(),
    start: start.toISOString(),
    end: end.toISOString(),
    duration,
  };
};

const createParkingSessions = (date) => {
  let start = new Date(date);

  start.setHours(2, 0, 0, 0);
  return [...Array(faker.random.number({ min: 1, max: 3 })).keys()].map(() => {
    const duration = faker.random.number({ min: 1, max: 4 });
    const session = createParkingSession({ start: date, duration });
    start = new Date(start);
    start.setHours(
      start.getHours() + duration + faker.random.number({ min: 1, max: 3 })
    );
    return session;
  });
};

const createInfractions = ({ sessions, plate, plateId, zoneNumber }) => {
  const infractions = [];
  const buildInfractionDateBetween = ({ start, end = null }) => {
    const eod = new Date(start);
    eod.setHours(23, 59, 59);
    const gapInHours = ((end ? new Date(end) : eod) - new Date(start)) / 36e5;
    const date = new Date(start);
    date.setMinutes(faker.random.number({ min: 5, max: gapInHours * 60 - 5 }));
    return date;
  };

  for (let i = 0; i < sessions.length; i += 1) {
    const randomNumber = faker.random.number({ min: 0, max: 5 });
    const session = sessions[i];
    const range =
      i + 1 === sessions.length
        ? { start: session.end }
        : { start: session.end, end: sessions[i + 1].start };
    const date = buildInfractionDateBetween(range);

    if (randomNumber === 3) {
      infractions.push(
        createVerifiedInfraction({ date, plate, plateId, zoneNumber })
      );
    }
    if (randomNumber === 2) {
      infractions.push(
        createParkadeInfraction({ date, plate, plateId, zoneNumber })
      );
    }
  }

  if (infractions.length === 0) {
    const date = buildInfractionDateBetween({
      start: sessions[sessions.length - 1].end,
    });
    infractions.push(
      createVerifiedInfraction({ date, plate, plateId, zoneNumber })
    );
  }

  return infractions;
};

const createPermit = (plate) => {
  return {
    id: faker.random.uuid(),
    noOfStalls: faker.random.number({ min: 1, max: 2 }),
    category: faker.random.arrayElement(['EXEMPT_VEHICLE', 'VEHICLE']),
    externalId: faker.random.uuid(),
    licencePlate: plate,
  };
};

const createPermitSchedules = (date, plate, zoneNumber) => {
  const today = new Date(date);
  const tomorrow = new Date(date);

  tomorrow.setDate(today.getDate() + faker.random.number({ min: 10, max: 29 }));
  return {
    effectiveDate: today.toISOString(),
    expiryDate: tomorrow.toISOString(),
    id: faker.random.uuid(),
    parkingSchedule: [
      { day: 'MONDAY', time: { start: '08:00:00', end: '16:59:59' } },
      { day: 'TUESDAY', time: { start: '08:00:00', end: '16:59:59' } },
      { day: 'WEDNESDAY', time: { start: '08:00:00', end: '16:59:59' } },
      { day: 'THURSDAY', time: { start: '08:00:00', end: '16:59:59' } },
      { day: 'FRIDAY', time: { start: '08:00:00', end: '16:59:59' } },
      { day: 'SATURDAY', time: { start: '00:00:00', end: '23:59:59' } },
      { day: 'SUNDAY', time: { start: '00:00:00', end: '23:59:59' } },
    ],
    licencePlate: plate,
    permit: createPermit(plate),
    zones: [zoneNumber, faker.random.number({ min: 200000, max: 200999 })],
  };
};

export const createZoneActivity = ({ date, plate, plateId }) => {
  const zoneNumber = faker.random.arrayElement(createdZones).zone;
  const sessions = createParkingSessions(date);
  const infractions = createInfractions({
    sessions,
    plate,
    plateId,
    zoneNumber,
  });

  const permitSchedules = [
    ...Array(faker.random.number({ min: 0, max: 2 })).keys(),
  ].map(() => createPermitSchedules(date, plate, zoneNumber));
  return {
    id: faker.random.uuid(),
    number: zoneNumber,
    sessions,
    permitSchedules,
    infractions,
  };
};

export const createLicencePlateActivities = (date) => {
  const plate = createLicensePlate();
  const plateId = faker.random.uuid();
  const zoneActivities = [
    ...Array(faker.random.number({ min: 1, max: 3 })).keys(),
  ].map(() => createZoneActivity({ date, plate, plateId }));
  return {
    id: plateId,
    number: plate,
    zones: zoneActivities,
  };
};

export let platesQueue = [];

export const createResults = (date) => {
  const plateActivities = [
    ...Array(faker.random.number({ min: 10, max: 50 })).keys(),
  ].map(() => createLicencePlateActivities(new Date(date.startDate)));
  const allInfractions = plateActivities
    .map((p) => p.zones.map((z) => z.infractions.map((i) => i)).flat())
    .flat();
  platesQueue = [...plateActivities];
  const platesResponse = [
    {
      start: date.startDate,
      end: date.endDate,
      plates: plateActivities,
      totalRemainingInfractions: allInfractions.length,
    },
  ];
  return platesResponse;
};

export const createPlateFromQueue = () => {
  return platesQueue[faker.random.number({ min: 0, max: platesQueue.length })].number;
};

export const refreshLicencePlates = (date, plates) => {
  const licencePlates = Object.values(plates);
  const allInfractions = licencePlates
    .map((p) => p.zones.map((z) => z.infractions.map((i) => i)).flat())
    .flat();
  const platesResponse = [
    {
      start: date.startDate,
      end: date.endDate,
      plates: licencePlates,
      totalRemainingInfractions: allInfractions.length,
    },
  ];
  return platesResponse;
};

export const releasePlate = (licencePlateId, body) => {
  return `Plate ${licencePlateId} is released from queue`;
};
