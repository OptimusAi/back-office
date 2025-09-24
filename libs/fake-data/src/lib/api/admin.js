import faker from 'faker';

export const createUser = () => ({
  id: faker.random.uuid(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  emailAddress: faker.internet.email(),
  parkPlusUserId: faker.random.uuid(),
});

export const createUsers = () =>
  [...Array(faker.random.number({ min: 3, max: 10 })).keys()].map((i) =>
    createUser()
  );

export const createUserRoles = (usersList) => {
  const userRoles = usersList.map((user) => ({
    authorities: [
      {
        authority: faker.random.arrayElement([
          'ROLE_ADMIN',
          'ROLE_VERIFICATION',
          'ROLE_ENFORCEMENT',
        ]),
      },
    ],
    externalId: faker.random.uuid(),
    externalIssuer: 'CPA-FAKE',
    id: user.parkPlusUserId,
  }));
  return userRoles;
};

export const updateUserRoles = (body) => {
  const user = createUser();
  return {
    ...user,
    parkPlusUserId: body.parkPlusPrincipalId,
    authorities: [body.newSimpleGrantedAuthority],
  };
};

export const removeUserRoles = (body) => {
  const user = createUser();
  return {
    ...user,
    parkPlusUserId: body.parkPlusPrincipalId,
    authorities: ['ROLE_USER'],
  };
};
