import {
  errorFields,
  getErrorMessage,
  errorTypes,
  failedFields,
  managementErrorKeys,
} from './management.enums';


export const mapZoneRows = (zoneList) => {
  return zoneList.map((z) => ({
    id: z.id,
    zone: z.zone,
    zoneAddress: z.address,
    zoneCity: z.city === null ? '' : z.city.city,
    zoneCategory: z.zoneCategory.name,
    pairingTimeLimit: z.pairingTimeLimit,
    arrivalGraceTime: z.arrivalGraceTime,
    departureGraceTime: z.departureGraceTime,
  }));
};

export const mapZoneCategoryRows = (zoneCategoriesList) => {
  return zoneCategoriesList.map((z) => ({
    id: z.id,
    zoneCategory: z.name,
    description: z.description,
  }));
};

export const mapBylawRows = (bylawsList) => {
  return bylawsList.map((b) => ({
    id: b.id,
    bylawCode: b.code,
    sectionCode: b.sectionCode,
    description: b.description,
  }));
};

const getErrorField = (errorField) => {
  if (errorField === errorFields.pairingTimeLimit) {
    return failedFields.pairingTimeLimit;
  }
  if (errorField === errorFields.arrivalGraceTime) {
    return failedFields.arrivalGraceTime;
  }
  if (errorField === errorFields.departureGraceTime) {
    return failedFields.departureGraceTime;
  }
  if (errorField === errorFields.zoneCategoryName) {
    return failedFields.zoneCategoryName;
  }
  if (errorField === errorFields.zoneCategoryDescription) {
    return failedFields.zoneCategoryDescription;
  }
  if (errorField === errorFields.bylawCode) {
    return failedFields.bylawCode;
  }
  if (errorField === errorFields.sectionCode) {
    return failedFields.sectionCode;
  }
  if (errorField === errorFields.description) {
    return failedFields.description;
  }
  if (errorField === errorFields.zoneCategoryId) {
    return failedFields.zoneCategoryId;
  }
  if (errorField === errorFields.zone) {
    return failedFields.zone;
  }
  return failedFields.default;
};

export const mapErrors = (error) => {
  if (error[0].errors) {
    const errors = Object.entries(error[0].errors);
    const mappedErrors = errors.map((e) => ({
      message: `${getErrorField(e[0])} ${e[1]}`,
      type: 'error',
      open: true,
    }));
    return mappedErrors[0];
  } else if (error[0].message.includes(errorTypes.duplicate)) {
    if (error[0].message.includes('zone_client_id_zone_key')) {
      return {
        message: getErrorMessage(managementErrorKeys.duplicateZone),
        type: 'error',
        open: true,
      };
    }  if (error[0].message.includes('zone_category_client_id_name_key')) {
      return {
        message: getErrorMessage(managementErrorKeys.duplicateZoneCategory),
        type: 'error',
        open: true,
      };
    } else {
      return {
        message: getErrorMessage(managementErrorKeys.duplicate),
        type: 'error',
        open: true
      };
    }
  } else if (error[0].message.includes(errorTypes.deleteError)) {
    return {
      message: getErrorMessage(managementErrorKeys.deleteErrorMessage),
      type: 'error',
      open: true,
    };
  } else if (error[0].message.includes(errorTypes.deleteBylawError)) {
    return {
      message: getErrorMessage(managementErrorKeys.deleteBylawErrorMessage),
      type: 'error',
      open: true,
    };
  } else if (error[0].message.includes(errorTypes.deleteZonePermitError)) {
    return {
      message: getErrorMessage(managementErrorKeys.deleteZonePermitErrorMessage),
      type: 'error',
      open: true,
    };
  } else if (error[0].message.includes(errorTypes.deleteZoneSessionError)) {
    return {
      message: getErrorMessage(managementErrorKeys.deleteZoneSessionErrorMessage),
      type: 'error',
      open: true,
    };
  } else if (error[0].message.includes(errorTypes.deleteZoneInfractionError)) {
    return {
      message: getErrorMessage(managementErrorKeys.deleteZoneInfractionErrorMessage),
      type: 'error',
      open: true,
    };
  } else if (error[0].message.includes(errorTypes.pairingTimeLimitNullError)) {
    return {
      message: getErrorMessage(managementErrorKeys.pairingTimeLimitNullErrorMessage),
      type: 'error',
      open: true,
    };
  } else if (error[0].message.includes(errorTypes.arrivalgracetimeNullError)) {
    return {
      message: getErrorMessage(managementErrorKeys.arrivalgracetimeNullErrorMessage),
      type: 'error',
      open: true,
    };
  } else if (error[0].message.includes(errorTypes.departuregracetimeNullError)) {
    return {
      message: getErrorMessage(managementErrorKeys.departuregracetimeNullErrorMessage),
      type: 'error',
      open: true,
    };
  } else {
    return {
      message: failedFields.default,
      type: 'error',
      open: true
    };
  }
};