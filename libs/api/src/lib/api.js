import { configureRest, get, put, post, del } from './rest';
import { toAPIDates, getFormattedDate } from './utils';

export const configureApi = configureRest;

export const ping = () => get('/session/ping');

export const getClientData = (email) => {
  const client = get(`/client/user/email/${email}`);
  return client;
};

export const getCountrySubdivisions = () => {
  const regions = get('/enforcement/region-info/subdivisions');
  return regions;
};

export const getPotentialInfractions = (date) => {
  const formattedDate = getFormattedDate(date);
  const infractionsByZone = get(
    `/enforcement/infractions/verifiable?searchDate=${formattedDate}`
  );
  return infractionsByZone;
};

export const getInfractionFromQueue = ({ zoneNumber, date }) => {
  const formattedDate = getFormattedDate(date);

  const infractionFromQueue = get(
    `/enforcement/workflow/infractions/${zoneNumber}/next?date=${formattedDate}`
  );
  return infractionFromQueue;
};

export const infractionUpdate = (infractionId, body) => {
  const updatedPotentialInfraction = put(
    `/enforcement/infractions/${infractionId}`,
    body
  );
  return updatedPotentialInfraction;
};

export const sendInfractionsToEnforce = async (date, zoneCategory) => {
  const dates = toAPIDates(date);
  const dateRange = {
    start: dates.start,
    end: dates.end,
    zoneCategoryName: zoneCategory,
  };
  const sendToEnforce = post('/enforcement/infractions/enforce', {
    body: dateRange,
  });
  return sendToEnforce;
};

export const markZoneEnforceable = async ({ date, zoneId }) => {
  const formattedDate = getFormattedDate(date);
  const enforcedZone = post(
    `/enforcement/infractions/zone/${zoneId}/${formattedDate}`
  );
  return enforcedZone;
};

export const releaseInfraction = async (zoneNumber, body) => {
  const releasedInfraction = post(
    `/enforcement/workflow/infractions/${zoneNumber}/unassign`,
    body
  );
  return releasedInfraction;
};

export const getLicencePlates = (date) => {
  const dates = toAPIDates(date);
  const licencePlates = get(
    `/enforcement/infractions/enforceable?start=${dates.start}&end=${dates.end}`
  );
  return licencePlates;
};

export const refreshPlates = (date, plates) => {
  const dates = toAPIDates(date);
  const licencePlates = get(
    `/enforcement/infractions/enforceable?start=${dates.start}&end=${dates.end}`
  );
  return licencePlates;
};

export const getLicencePlateFromQueue = (date) => {
  const formattedDate = getFormattedDate(date);
  const plateFromQueue = get(
    `/enforcement/workflow/licenceplate/next?date=${formattedDate}`
  );
  return plateFromQueue;
};

export const getBylawsByZone = (zoneNumber) => {
  const bylaws = get(`/enforcement/zonebylaws/zone/${zoneNumber}`);
  return bylaws;
};

export const zoneByLawAdd = (body) => {
  const zoneBylaws = post(`/enforcement/zonebylaws`, body);
  return zoneBylaws;
};

export const processPlateInfractions = async (body) => {
  const processedInfractions = post(
    '/enforcement/infractions/enforce/nextplate',
    body
  );
  return processedInfractions;
};

export const releasePlate = async (date) => {
  const formattedDate = getFormattedDate(date);
  const releasedInfraction = post(
    `/enforcement/workflow/licenceplate/unassign?date=${formattedDate}`
  );
  return releasedInfraction;
};

export const clearPlateFromDispatcher = async (licencePlateId) => {
  const clearedInfraction = del(
    `/enforcement/workflow/licenceplate/${licencePlateId}`
  );
  return clearedInfraction;
};

// ZONE MANAGEMENT
export const getAllZones = () => {
  const zones = get('/zone/');
  return zones;
};

export const zoneUpdate = (zoneNumber, body) => {
  const updatedZone = put(`/zone/${zoneNumber}`, body);
  return updatedZone;
};

export const getAllZoneCategories = () => {
  const zoneCategories = get('/zone/category/');
  return zoneCategories;
};

export const getAllZoneCities = () => {
  const zoneCities = get('/zone/city/');
  return zoneCities;
};

export const zoneCategoryUpdate = (id, body) => {
  const updatedZoneCategory = put(`/zone/category/${id}`, body);
  return updatedZoneCategory;
};

export const zoneCategoryAdd = (body) => {
  const updatedZoneCategory = post(`/zone/category/`, body);
  return updatedZoneCategory;
};

export const zoneCategoryDelete = (id) => {
  const deletedZoneCategory = del(`/zone/category/${id}`);
  return deletedZoneCategory;
};

export const getAllBylaws = () => {
  const bylaws = get('/enforcement/bylaws');
  return bylaws;
};

export const bylawAdd = (body) => {
  const newBylaw = post(`/enforcement/bylaws`, body);
  return newBylaw;
};

export const bylawUpdate = (id, body) => {
  const updatedBylaw = put(`/enforcement/bylaws/${id}`, body);
  return updatedBylaw;
};

export const bylawAssociation = (body) => {
  const newBylaw = post(`/enforcement/zonebylaws`, body);
  return newBylaw;
};

export const getBylawsByZoneCategory = (zoneCategoryId) => {
  const associatedBylaws = get(`/enforcement/zonebylaws/${zoneCategoryId}`);
  return associatedBylaws;
};

export const removeBylawAssociation = (body) => {
  const removedBylaws = del(`/enforcement/zonebylaws/delete`, { body });
  return removedBylaws;
};

export const bylawDelete = (id) => {
  const deletedBylaw = del(`/enforcement/bylaws/${id}`);
  return deletedBylaw;
};

export const zoneDelete = (zone) => {
  const deletedZone = del(`/zone/${zone}`);
  return deletedZone;
};

export const zoneAdd = (body) => {
  const addedZone = post(`/zone/`, { body });
  return addedZone;
};

export const getUsers = () => {
  const users = get(`/client/users`);
  return users;
};

export const getUserRoles = (usersObj) => {
  let userIds = [];
  usersObj.forEach((u) => {
    if (u.parkPlusUserId === null) {
      return;
    } else {
      userIds.push(u.parkPlusUserId);
    }
  });

  const userRoles = get(`/authentication/principal?ids=${userIds.toString()}`);
  return userRoles;
};

export const updateRole = (body) => {
  const updatedUser = put(
    `/authentication/principal/${body.parkPlusPrincipalId}`,
    { body }
  );
  return updatedUser;
};

export const removeRole = (body) => {
  const updatedUser = del(
    `/authentication/principal/${body.parkPlusPrincipalId}`,
    { body }
  );
  return updatedUser;
};

export const infractionsDeleteByZones = (body) => {
  const deleteInfractions = del(`/enforcement/infractions/zones`, { body });
  return deleteInfractions;
};

export const getOperatorsAndDevices = (date) => {
  const formattedDate = getFormattedDate(date);
  const operatorsAndUnits = get(
    `/enforcement/observations/operatorsUnitsByDate?searchDate=${formattedDate}`
  );
  return operatorsAndUnits;
};
