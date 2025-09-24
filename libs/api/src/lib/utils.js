import { formatISO9075 } from 'date-fns';

export const toAPIDates = (date) => {
  let apiDate = new Date(date);
  const start =
    new Date(apiDate.setHours(0, 0, 0)).toISOString().split('.')[0] + 'Z';
  const end =
    new Date(apiDate.setHours(23, 59, 59)).toISOString().split('.')[0] + 'Z';
  const dates = { start, end };
  return dates;
};

export const getFormattedDate = (date) => {
  return formatISO9075(new Date(date), { representation: 'date' });
};
