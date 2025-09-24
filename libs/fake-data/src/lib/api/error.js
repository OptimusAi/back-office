import faker from 'faker';

export default {
  build() {
    return {
      code: faker.random.alphaNumeric(),
      correlationId: faker.random.uuid(),
      message: faker.random.words(),
    };
  },
};
