import faker from 'faker';
import { createZoneNumber } from './observations';

const createInfractionDetails = (date) => ({
  id: faker.random.uuid(),
  observedAt: date,
  status: 'UNVERIFIED',
});

export const createZoneMetrics = (date) => {
  const totalInfractions = faker.random.number({ min: 2, max: 8 });
  const zoneNumber = createZoneNumber();
  return {
    zone: zoneNumber,
    totalInfractionsInZone: totalInfractions,
    completionRatio: 0.25,
    infractionDetails: [
      ...Array(
        faker.random.number({ min: totalInfractions, max: totalInfractions })
      ).keys(),
    ].map(() => createInfractionDetails(date)),
  };
};

export const createPotentialInfractionsByZone = (date) => {
  const zoneMetrics = [
    ...Array(faker.random.number({ min: 3, max: 5 })).keys(),
  ].map(() => createZoneMetrics(date));
  const totalInfractions = zoneMetrics
    .map((z) => z.infractionDetails.map((i) => i))
    .flat();
  return {
    id: faker.random.uuid(),
    clientId: faker.random.uuid(),
    infractionDate: date,
    totalInfractions: totalInfractions.length,
    totalRemainingInfractions: totalInfractions.length,
    totalObservations: totalInfractions.length,
    zoneMetrics,
  };
};
