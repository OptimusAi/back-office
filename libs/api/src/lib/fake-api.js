import { api } from '@park-plus/fake-data';

const response = (ok, status, data) => ({
  ok,
  status,
  data,
});

export const configureApi = () => {
  /* do nothing */
};

export const ping = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(response(true, 200, {})), 100);
  });

export const toAPIDates = (date) => {
  let apiDate = new Date(date);
  const startDate = new Date(apiDate.setHours(0, 0, 0)).toISOString();
  const endDate = new Date(apiDate.setHours(23, 59, 59)).toISOString();
  const dates = {
    startDate,
    endDate,
  };
  return dates;
};

export const getClientData = (clientId) =>
  new Promise((resolve) => {
    setTimeout(
      () => resolve(response(true, 200, api.createClient(clientId))),
      100
    );
  });

export const getCountrySubdivisions = () =>
  new Promise((resolve) => {
    setTimeout(
      () => resolve(response(true, 200, api.getCountrySubdivisions())),
      100
    );
  });

export const getPotentialInfractions = (date) =>
  new Promise((resolve) => {
    const apiDates = toAPIDates(date);
    setTimeout(
      () =>
        resolve(
          response(
            true,
            200,
            api.createPotentialInfractionsByZone(apiDates.startDate)
          )
        ),
      100
    );
  });

export const getInfractionFromQueue = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(response(true, 200, api.createInfraction())), 100);
  });

export const infractionUpdate = (infractionId, body) =>
  new Promise((resolve) => {
    setTimeout(
      () =>
        resolve(
          response(true, 200, api.createCustomInfraction(infractionId, body))
        ),
      100
    );
  });

export const releaseInfraction = (zoneNumber, body) =>
  new Promise((resolve) => {
    setTimeout(
      () =>
        resolve(response(true, 200, api.releaseInfraction(zoneNumber, body))),
      100
    );
  });

export const sendInfractionsToEnforce = (infractions, date) =>
  api.sendToEnforce(infractions, date);

export const getLicencePlates = (date) =>
  new Promise((resolve) => {
    const apiDates = toAPIDates(date);
    setTimeout(
      () =>
        resolve(
          response(true, 200, api.createResults(toAPIDates(apiDates.startDate)))
        ),
      100
    );
  });

export const markZoneEnforceable = (body) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(response(true, 200, api.completeZone(body))), 100);
  });

export const getLicencePlateFromQueue = (date) =>
  new Promise((resolve) => {
    setTimeout(
      () => resolve(response(true, 200, api.createPlateFromQueue(date))),
      100
    );
  });

export const refreshPlates = (date, plates) =>
  new Promise((resolve) => {
    setTimeout(
      () =>
        resolve(
          response(
            true,
            200,
            api.refreshLicencePlates(toAPIDates(date), plates)
          )
        ),
      100
    );
  });

export const getBylawsByZone = (zoneNumber) =>
  new Promise((resolve) => {
    setTimeout(
      () => resolve(response(true, 200, api.getInfractionBylaws(zoneNumber))),
      100
    );
  });

export const processPlateInfractions = (body) =>
  new Promise((resolve) => {
    setTimeout(
      () => resolve(response(true, 200, api.processInfractions(body))),
      100
    );
  });

export const releasePlate = (licencePlateId, body) =>
  new Promise((resolve) => {
    setTimeout(
      () =>
        resolve(
          response(true, 200, api.releaseInfraction(licencePlateId, body))
        ),
      100
    );
  });

export const clearPlateFromDispatcher = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(response(true, 200, '')), 100);
  });

// ZONE MANAGEMENT
export const getAllZones = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(response(true, 200, api.createdZones)), 100);
  });

export const zoneUpdate = (zoneNumber, body) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(response(true, 200, api.zoneUpdate(body))), 100);
  });

export const zoneAdd = (body) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(response(true, 200, api.createZone(body))), 100);
  });

export const zoneDelete = (zoneNumber, body) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(response(true, 200, api.zoneUpdate(body))), 100);
  });

export const getAllZoneCategories = (zoneNumber, body) =>
  new Promise((resolve) => {
    setTimeout(
      () =>
        resolve(
          response(true, 200, api.createZoneCategories(zoneNumber, body))
        ),
      100
    );
  });

export const getAllZoneCities = (zoneNumber, body) =>
  new Promise((resolve) => {
    setTimeout(
      () =>
        resolve(response(true, 200, api.createZoneCities(zoneNumber, body))),
      100
    );
  });

export const zoneCategoryUpdate = (id, body) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(response(true, 200, api.zoneUpdate(body))), 100);
  });

export const zoneCategoryAdd = (body) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(response(true, 200, api.zoneUpdate(body))), 100);
  });

export const zoneCategoryDelete = (body) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(response(true, 200, api.zoneUpdate(body))), 100);
  });

export const getAllBylaws = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(response(true, 200, api.createBylaws())), 100);
  });

export const bylawUpdate = (id, body) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(response(true, 200, api.bylawUpdate(body))), 100);
  });

export const bylawAdd = (body) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(response(true, 200, api.bylawUpdate(body))), 100);
  });

export const bylawDelete = (body) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(response(true, 200, api.bylawUpdate(body))), 100);
  });

export const bylawAssociation = (body) =>
  new Promise((resolve) => {
    setTimeout(
      () => resolve(response(true, 200, api.associateBylaws(body))),
      100
    );
  });

export const getBylawsByZoneCategory = (zoneCategoryId) =>
  new Promise((resolve) => {
    setTimeout(
      () => resolve(response(true, 200, api.createBylaws(zoneCategoryId))),
      100
    );
  });

export const removeBylawAssociation = (body) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(response(true, 200, api.createBylaws(body))), 100);
  });

// ADMIN
export const getUsers = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(response(true, 200, api.createUsers())), 100);
  });

export const getUserRoles = (usersList) =>
  new Promise((resolve) => {
    setTimeout(
      () => resolve(response(true, 200, api.createUserRoles(usersList))),
      100
    );
  });

export const updateRole = (body) =>
  new Promise((resolve) => {
    setTimeout(
      () => resolve(response(true, 200, api.updateUserRoles(body))),
      100
    );
  });

export const removeRole = (body) =>
  new Promise((resolve) => {
    setTimeout(
      () => resolve(response(true, 200, api.removeUserRoles(body))),
      100
    );
  });

console.info('using fake api');
