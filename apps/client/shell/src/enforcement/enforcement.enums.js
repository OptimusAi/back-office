export const infractionStatus = Object.freeze({
  verified: 'VERIFIED',
  ignored: 'IGNORED',
  enforceable: 'ENFORCEABLE',
  permissible: 'PERMISSIBLE',
  unenforceable: 'UNENFORCEABLE',
  rejected: 'REJECTED',
  approved: 'APPROVED',
  unverified: 'UNVERIFIED',
  warning: 'WARNING',
});

export const infractionEvents = Object.freeze({
  ignore: 'IGNORE',
  verify: 'VERIFY',
  skipNext: 'SKIP_NEXT',
  reverify: 'REVERIFY',
  sendToEnforce: 'SEND_TO_ENFORCE',
  reject: 'REJECT',
  approve: 'APPROVE',
  warningIssued: 'WARNING_ISSUED',
});

export const observationTypes = Object.freeze({
  entry: 'ENTRY',
  exit: 'EXIT',
  realtime: 'REALTIME',
});

export const zoneStatus = {
  notDone: 0,
  done: 1,
  none: 2,
};

export const errorFields = {
  licencePlateNumber: 'licencePlate.licencePlateNumber',
};

export const failedFields = {
  licencePlateNumber: 'Licence Plate',
  default: 'Something went wrong',
};

export const imageTypes = Object.freeze({
  hidden: 'HIDDEN',
  profile: 'PROFILE',
  rear: 'REAR',
  plate: 'PLATE',
});

export const permitTypes = {
  standard: 'STANDARD',
  exemptVehicle: 'EXEMPT_VEHICLE',
};

export const defaultPermitExpiryDate = '2470-01-01T00:00:00Z';

export const requestStatus = {
  inProgress: 'in progress',
  resolved: 'resolved',
  rejected: 'rejected',
};
