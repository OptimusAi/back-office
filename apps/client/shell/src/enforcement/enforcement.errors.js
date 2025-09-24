export const enforcementErrors = {
  en: {
    plateFormat: 'Licence plate must be uppercase and alphanumeric',
    imageSelect: 'You must select one profile image and one rear image',
    defaultBylaw: 'Bylaw must be selected',
    permissible: 'Potential Infraction has been provided Permission To Park',
    failedEnforceableZone: 'Zone could not be marked enforceable',
    partiallyFailedEnforceableZone:
      'Some potential infractions contained errors and could not be made enforceable.',
    infractionNotAssigned:
      'You are not assigned to this infraction. ParkPlus will load the next available infraction for your review.',
    plateNotAssigned: `You are not assigned to this licence plate. ParkPlus will load the next available licence plate for your review.`,
    default: 'Something went wrong',
  },
  fr: {
    plateFormat: `La plaque d'immatriculation doit être en majuscule et alphanumérique`,
    imageSelect: `Vous devez sélectionner une image de profil et une image arrière`,
    defaultBylaw: 'Loi doit être sélectionnée',
    permissible: `Une infraction potentielle a été fournie avec l'autorisation de se garer`,
    failedEnforceableZone: `L'action de marquer infractions dans la zone n'a pas été exécutée`,
    partiallyFailedEnforceableZone: `L'action de marquer toutes les infractions dans la zone n'a pas été exécutée`,
    infractionNotAssigned: `Infraction n'est pas assigne`,
    plateNotAssigned: `La plaque n'est pas assigne`,
    default: `L'action n'a pas été exécutée `,
  },
};

export const enforcementErrorKeys = {
  plateFormat: 'plateFormat',
  imageSelect: 'imageSelect',
  defaultBylaw: 'defaultBylaw',
  permissible: 'permissible',
  default: 'default',
  failedEnforceableZone: 'failedEnforceableZone',
  partiallyFailedEnforceableZone: 'partiallyFailedEnforceableZone',
  infractionNotAssigned: 'infractionNotAssigned',
  plateNotAssigned: 'plateNotAssigned',
};

export const getErrorMessage = (key) => {
  if (navigator.language === 'fr') {
    return enforcementErrors.fr[key];
  } else {
    return enforcementErrors.en[key];
  }
};
