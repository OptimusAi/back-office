export const mapUsers = (usersList, rolesList) => {
  const mappedUsers = usersList.map((user) => {
    const userRole = rolesList.filter(
      (role) => role.id === user.parkPlusUserId
    );

    if (userRole !== [] && userRole.length !== 0) {
      const auths = userRole[0].authorities.map((e) => e.authority);
      return {
        ...user,
        id: userRole[0].id,
        userId: user.id,
        authorities: [...auths],
      };
    } else {
      return {
        ...user,
        authorities: [],
      };
    }
  });
  return mappedUsers;
};

export const mapUser = (user) => {
  const auths = user.authorities.map((e) => Object.values(e)).flat();
  auths.join();
  return {
    ...user,
    authorities: auths,
  };
};
