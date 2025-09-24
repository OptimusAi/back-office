import base, { keys } from './environment.base';

export const environment = {
  ...base,
  [keys.name]: 'prod',
  [keys.production]: true,
};

export default environment;
