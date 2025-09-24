export const routes = Object.freeze({
  home: '/',
});

export const indexOf = (path) => {
  const index = Object.values(routes).indexOf(path);
  return index < 0 ? 0 : index;
};

export default routes;
