import faker from 'faker';

export const createBylaw = () => ({
  id: faker.random.uuid(),
  clientId: faker.random.uuid(),
  code: faker.address.countryCode(),
  description: faker.lorem.sentence(),
  sectionCode: faker.system.semver(),
  externalReferenceId: faker.random.uuid(),
});

export const createBylaws = () =>
  [...Array(faker.random.number({ min: 1, max: 10 })).keys()].map((i) =>
    createBylaw()
  );

export const bylawUpdate = ({ body }) => body;

export const associateBylaws = ({ body }) => body;
