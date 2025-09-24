import base, { keys } from './environment.base';

export const environment = {
  ...base,
  [keys.name]: '#{env}#',
  [keys.apiBaseUrl]: '#{apiBaseUrl}#',
  [keys.appBaseUrl]: '#{appBaseUrl}#',
  [keys.cpaOauthBaseUrl]: '#{cpaOauthBaseUrl}#',
  [keys.clientId]: '#{clientId}#'
};

export default environment;
