import { activeInfractionOnEnforce } from '../utils/test-utils/mocks';
import { failedFields } from './enforcement.enums';
import {
  formatImages,
  getInfractionDetails,
  mapParkingSchedule,
  mapErrors,
} from './enforcement.mappers';

describe('Enforcement Mappers', () => {
  describe('should formatImages', () => {
    test('should add Bearer Token to image url', async () => {
      const expectedImages = [
        {
          id: 1,
          infractionId: '001',
          imageType: 'PROFILE',
          src: 'http://fakeimage.com?access_token=a-fake-token',
          useToEnforce: true,
        },
        {
          id: 2,
          infractionId: '001',
          imageType: 'PLATE',
          src: 'http://fakeimage.com?access_token=a-fake-token',
          useToEnforce: true,
        },
      ];
      const images = [
        {
          photoId: 1,
          infractionId: '001',
          imageType: 'PROFILE',
          url: 'http://fakeimage.com',
          useToEnforce: true,
        },
        {
          photoId: 2,
          infractionId: '001',
          imageType: 'PLATE',
          url: 'http://fakeimage.com',
          useToEnforce: true,
        },
      ];
      const formattedImages = await formatImages(images);
      expect(formattedImages).toEqual(expectedImages);
    });
  });

  describe('should getInfractionDetails', () => {
    test('should getInfractionDetails', async () => {
      const infractions = [activeInfractionOnEnforce];

      const infractionDetails = getInfractionDetails(infractions);
      expect(infractionDetails[0]).toStrictEqual({
        bylawId: null,
        event: 'REJECT',
        infractionId: 3,
      });
    });
  });

  describe('Map Errors', () => {
    test('should return specific message when no image is selected', () => {
      const error = [
        {
          code: 'VALIDATION',
          correlationId: 1,
          message: 'image_should_be_selected',
        },
      ];
      const errorMessage = mapErrors(error);
      expect(errorMessage).toEqual({
        message: `You must select one profile image and one rear image`,
        type: 'error',
        open: true,
      });
    });

    test('should return specific message when no bylaw selected', () => {
      const error = [
        {
          code: 'VALIDATION',
          correlationId: 1,
          message: 'bylaw.invalid.bylaw_id',
        },
      ];
      const errorMessage = mapErrors(error);
      expect(errorMessage).toEqual({
        message: `Bylaw must be selected`,
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
  describe('map parking schedules', () => {
    test('should return formatted parking schedules', () => {
      const schedules = [
        { day: 'MONDAY', time: { start: '08:00:00', end: '16:59:59' } },
        { day: 'TUESDAY', time: { start: '08:00:00', end: '16:59:59' } },
        { day: 'WEDNESDAY', time: { start: '08:00:00', end: '16:59:59' } },
        { day: 'THURSDAY', time: { start: '08:00:00', end: '16:59:59' } },
        { day: 'FRIDAY', time: { start: '08:00:00', end: '16:59:59' } },
        { day: 'SATURDAY', time: { start: '00:00:00', end: '23:59:59' } },
        { day: 'SUNDAY', time: { start: '00:00:00', end: '23:59:59' } },
      ];
      const expectedSchedules = [
        { index: 0, string: 'Mon-Fri: 08:00:00 - 16:59:59' },
        { index: 5, string: 'Sat-Sun: 00:00:00 - 23:59:59' },
      ];
      const formattedSchedules = mapParkingSchedule(schedules);
      expect(formattedSchedules[0]).toEqual(expectedSchedules[0]);
    });
  });
});
