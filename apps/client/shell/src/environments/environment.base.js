export const keys = {
  name: 'name',
  appBaseUrl: 'appBaseUrl',
  apiBaseUrl: 'apiBaseUrl',
  cpaOauthBaseUrl: 'cpaOauthBaseUrl',
  clientId: 'clientId',
  production: 'production',
};

export default {
  [keys.name]: window.ENV.env,
  [keys.cpaOauthBaseUrl]: window.ENV.cpaOauthBaseUrl,
  [keys.appBaseUrl]: window.ENV.appBaseUrl,
  [keys.apiBaseUrl]: window.ENV.apiBaseUrl,
  [keys.clientId]: window.ENV.clientId,
  [keys.production]: false
};
