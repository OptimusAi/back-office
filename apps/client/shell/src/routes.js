export const routes = Object.freeze({
  dashboard: '/',
  enforcement: '/enforcement',
  zones: '/zones',
  admin: '/admin',
  signin: '/login/callback',
  logout: '/logout',
  logoutCallback: '/logout/callback',
});

export const indexOf = (path) => {
  const index = Object.values(routes).indexOf(path);
  return index < 0 ? 0 : index;
};

export default routes;
