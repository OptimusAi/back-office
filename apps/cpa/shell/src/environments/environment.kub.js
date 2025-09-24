export const keys = {
  name: 'name',
  appBaseUrl: 'appBaseUrl',
  apiBaseUrl: 'apiBaseUrl',
  logoutUrl: 'logoutUrl',
  clientId: 'clientId',
  authority: 'authority',
  parkPlusAuthority: 'parkPlusAuthority',
  production: 'production',
};

export const environment = {
  [keys.name]: process.env.name,
  [keys.apiBaseUrl]: process.env.apiBaseUrl,
  [keys.appBaseUrl]: process.env.appBaseUrl,
  [keys.authority]: process.env.authority,
  [keys.clientId]: process.env.clientId,
  [keys.parkPlusAuthority]: process.env.parkPlusAuthority
};

export default environment;