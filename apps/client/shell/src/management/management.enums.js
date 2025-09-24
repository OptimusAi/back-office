export const errorFields = {
  pairingTimeLimit: 'pairingTimeLimit',
  arrivalGraceTime: 'arrivalGraceTime',
  departureGraceTime: 'departureGraceTime',
  zoneCategoryName: 'name',
  zoneCategoryDescription: 'description',
  zoneCategoryId: 'zoneCategoryId',
  bylawCode: 'code',
  sectionCode: 'sectionCode',
  description: 'Description',
  zone: 'zone'
};

export const failedFields = {
  pairingTimeLimit: 'Pairing Time Limit',
  arrivalGraceTime: 'Arrival Grace Time',
  departureGraceTime: 'Departure Grace Time',
  default: 'Something went wrong, please try again',
  zoneCategoryName: 'Name',
  zoneCategoryDescription: 'Description',
  zoneCategoryId : 'Zone Category',
  bylawCode: 'Code',
  sectionCode: 'SectionCode',
  description: 'Description',
  zone: 'Zone number'
};

export const errorTypes = {
  duplicate: 'ERROR: duplicate key value violates unique constraint',
  deleteError : 'is still referenced from table "zone"',
  deleteBylawError : 'is still referenced from table "infraction"',
  deleteZonePermitError : 'validation.message.zone.permits.associated',
  deleteZoneSessionError : 'validation.message.zone.sessions.associated',
  deleteZoneInfractionError : 'validation.message.zone.infractions.associated',
  pairingTimeLimitNullError: 'ERROR: null value in column "pairing_time_limit" violates not-null constraint',
  arrivalgracetimeNullError: 'ERROR: null value in column "arrival_grace_time" violates not-null constraint',
  departuregracetimeNullError: 'ERROR: null value in column "departure_grace_time" violates not-null constraint',
};

export const errorMessages = {
  en: {
    duplicate: 'Bylaw and section code combination already exists',
    duplicateZone: 'Zone already exists',
    duplicateZoneCategory: 'Zone Category already exists',
    deleteErrorMessage : 'Cannot delete zone category with associated zone(s)',
    deleteBylawErrorMessage : 'Cannot delete bylaw with associated infraction(s)',
    deleteZonePermitErrorMessage : 'Cannot delete zone with associated permit(s)',
    deleteZoneSessionErrorMessage : 'Cannot delete zone with associated session(s)',
    deleteZoneInfractionErrorMessage : 'Cannot delete zone with associated infraction(s)',
    pairingTimeLimitNullErrorMessage: 'Please define Pairing Time Limit',
    arrivalgracetimeNullErrorMessage: 'Please define Arrival Grace Time',
    departuregracetimeNullErrorMessage: 'Please define Departure Grace Time',
  },
  fr: {
    duplicate: `La combinaison de statut et de code d'article existe déjà`,
    duplicateZone: `La zone existe déjà`,
    duplicateZoneCategory: `La zone existe déjà`,
    deleteErrorMessage : `Impossible de supprimer la catégorie de zone avec la ou les zone(s) associées`,
    deleteBylawErrorMessage : 'Impossible de supprimer un règlement avec une infraction(s) associée',
    deleteZonePermitErrorMessage : 'Impossible de supprimer la zone avec les permis associés',
    deleteZoneSessionErrorMessage : 'Impossible de supprimer la zone avec la ou les sessions associées',
    deleteZoneInfractionErrorMessage : 'Impossible de supprimer une zone avec une ou plusieurs infractions associées',
    pairingTimeLimitNullErrorMessage: `Veuillez définir la limite de temps d'appariement`,
    arrivalgracetimeNullErrorMessage: `Veuillez définir l'heure de grâce d'arrivée`,
    departuregracetimeNullErrorMessage: `Veuillez définir l'heure de grâce de départ`,
  }
};

export const getErrorMessage = (key) => {
  if (navigator.language === 'fr') {
    return errorMessages.fr[key];
  } else {
    return errorMessages.en[key];
  }
};export const managementErrorKeys = {
  duplicate: 'duplicate',
  duplicateZone: 'duplicateZone',
  duplicateZoneCategory: 'duplicateZoneCategory',
  deleteErrorMessage: 'deleteErrorMessage',
  deleteBylawErrorMessage: 'deleteBylawErrorMessage',
  deleteZonePermitErrorMessage: 'deleteZonePermitErrorMessage',
  deleteZoneSessionErrorMessage: 'deleteZoneSessionErrorMessage',
  deleteZoneInfractionErrorMessage: 'deleteZoneInfractionErrorMessage',
  pairingTimeLimitNullErrorMessage: 'pairingTimeLimitNullErrorMessage',
  arrivalgracetimeNullErrorMessage: 'arrivalgracetimeNullErrorMessage',
  departuregracetimeNullErrorMessage: 'departuregracetimeNullErrorMessage'
};
