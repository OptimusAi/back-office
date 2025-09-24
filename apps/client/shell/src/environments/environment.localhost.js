import base, { keys } from './environment.base';

export const environment = {
  ...base,
  [keys.apiBaseUrl]: 'http://localhost:8080/api/',
  [keys.name]: 'localhost',
};

export default environment;
