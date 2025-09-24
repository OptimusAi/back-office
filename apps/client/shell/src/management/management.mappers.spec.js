import 'regenerator-runtime/runtime';
import {
  zoneCategoriesMock,
  formattedZonesMock,
  mappedZoneRowsMock,
  mappedZoneCategoriesMock,
  bylawsMock,
  mappedBylawsMock,
} from '../utils/test-utils/mocks';
import { failedFields } from './management.enums';
import {
  mapErrors,
  mapZoneRows,
  mapZoneCategoryRows,
  mapBylawRows,
} from './management.mappers';

describe('Management Mappers', () => {
  describe('Map Zone Rows', () => {
    test('should map rows to data grid specific format', () => {
      const mappedRows = mapZoneRows(formattedZonesMock);
      expect(mappedRows[0]).toEqual(mappedZoneRowsMock[0]);
    });
  });

  describe('Map Zone Category Rows', () => {
    test('should map rows to data grid specific format', () => {
      const mappedRows = mapZoneCategoryRows(zoneCategoriesMock);
      expect(mappedRows[0]).toEqual(mappedZoneCategoriesMock[0]);
    });
  });

  describe('Map Bylaw Rows', () => {
    test('should map rows to data grid specific format', () => {
      const mappedRows = mapBylawRows(bylawsMock);
      expect(mappedRows[0]).toEqual(mappedBylawsMock[0]);
    });
  });
  describe('Map Errors', () => {
    test('should return specific message when arrival grace time fails', () => {
      const error = [
        {
          code: 'VALIDATION',
          correlationId: 1,
          message: 'Validation error',
          errors: { arrivalGraceTime: 'must be less than or equal to 720' },
        },
      ];
      const errorMessage = mapErrors(error);
      expect(errorMessage).toEqual({
        message: `${failedFields.arrivalGraceTime} must be less than or equal to 720`,
        type: 'error',
        open: true,
      });
    });
    test('should return specific message when departure grace time fails', () => {
      const error = [
        {
          code: 'VALIDATION',
          correlationId: 1,
          message: 'Validation error',
          errors: { departureGraceTime: 'must be less than or equal to 720' },
        },
      ];
      const errorMessage = mapErrors(error);
      expect(errorMessage).toEqual({
        message: `${failedFields.departureGraceTime} must be less than or equal to 720`,
        type: 'error',
        open: true,
      });
    });
    test('should return generic message', () => {
      const error = [
        { code: 'VALIDATION', correlationId: 1, message: 'Invalid Request' },
      ];
      const errorMessage = mapErrors(error);
      expect(errorMessage).toEqual({
        message: failedFields.default,
        type: 'error',
        open: true,
      });
    });
  });
});
