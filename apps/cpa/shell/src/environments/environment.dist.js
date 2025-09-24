import base, { keys } from './environment.base';

export const environment = {
  ...base,
  [keys.name]: '#{env}#'
};

export default environment;
