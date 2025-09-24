import {
  infractionEvents,
  infractionStatus,
} from '../enforcement/enforcement.enums';
import {
  sortByEntryExit,
  getEventColor,
  getInfractionEventByStatus,
  sortByDate,
  getPlateImage,
  getEventStartTime,
  getEventEndTime,
  getFirstObservation,
  getLastObservation,
  getDayOfWeek,
  getParkingScheduleStartTime,
  getParkingScheduleEndTime,
  sortBylaws,
  getFormattedDate,
} from './enforcement.utils';
import {
  activeParkadeInfractionMock,
  infractionBylaws,
  permitMock,
} from './test-utils/mocks';

describe('Enforcement Utils', () => {
  describe('getInfracionEventByStatus', () => {
    test('should get infraction event IGNORE when status is Ignored', () => {
      const status = infractionStatus.ignored;
      const event = getInfractionEventByStatus(status);
      expect(event).toEqual(infractionEvents.ignore);
    });

    test('should get infraction event VERIFY_CORRECT when status is Enforceable ', () => {
      const status = infractionStatus.enforceable;
      const event = getInfractionEventByStatus(status);
      expect(event).toEqual(infractionEvents.verify);
    });
    test('should get infraction event REVIEW when status is Enforceable ', () => {
      const status = infractionStatus.verified;
      const event = getInfractionEventByStatus(status);
      expect(event).toEqual(infractionEvents.verified);
    });
  });

  describe('sortByDate', () => {
    test('should sort by date and time from earliest to latest', () => {
      const infractions = [
        {
          id: 1,
          observations: [
            {
              observedAt: new Date('2021-01-13T19:35:00.000+08:00'),
            },
          ],
        },
        {
          id: 2,
          observations: [
            {
              observedAt: new Date('2021-01-13T19:30:00.000+08:00'),
            },
          ],
        },
        {
          id: 3,
          observations: [
            {
              observedAt: new Date('2021-01-13T19:25:00.000+08:00'),
            },
          ],
        },
      ];
      const sortedInfractions = sortByDate(infractions);

      expect(sortedInfractions[0]).toEqual({
        id: 3,
        observations: [
          {
            observedAt: new Date('2021-01-13T19:25:00.000+08:00'),
          },
        ],
      });
    });
  });

  describe('getEventColor', () => {
    const colors = {
      gray: '#616161',
      orange: '#f57c00',
      red: '#f44336',
    };
    test('should get gray color when infraction event is ignored', () => {
      const infraction = { event: infractionEvents.ignore };
      const eventColor = getEventColor(infraction);
      expect(eventColor).toEqual(colors.gray);
    });
    test('should get red color when infraction event is approve', () => {
      const infraction = { event: infractionEvents.approve };
      const eventColor = getEventColor(infraction);
      expect(eventColor).toEqual(colors.red);
    });
    test('should get orange color when infraction event has not been selected', () => {
      const infraction = { event: undefined };
      const eventColor = getEventColor(infraction);
      expect(eventColor).toEqual(colors.orange);
    });
  });
  describe('get Sorted Images', () => {
    const images = sortByEntryExit(activeParkadeInfractionMock);

    expect(images).toEqual([
      {
        photoId: '2',
        infractionId: 'testId01',
        observationId: '2',
        url: 'http://fakeurl.com',
        imageType: 'REAR',
        useToEnforce: true,
      },
      {
        photoId: '1',
        infractionId: 'testId01',
        observationId: '1',
        url: 'http://fakeurl.com',
        imageType: 'REAR',
        useToEnforce: true,
      },
      {
        photoId: '3',
        infractionId: 'testId01',
        observationId: '1',
        url: 'http://fakeurl.com',
        imageType: 'PLATE',
        useToEnforce: true,
      },
      {
        photoId: '4',
        infractionId: 'testId01',
        observationId: '2',
        url: 'http://fakeurl.com',
        imageType: 'PLATE',
        useToEnforce: true,
      },
    ]);
  });
  describe('get Plate Image', () => {
    const images = [
      {
        photoId: '2',
        infractionId: 'testId01',
        observationId: '2',
        url: 'http://fakeurl.com',
        imageType: 'REAR',
        useToEnforce: true,
      },
      {
        photoId: '1',
        infractionId: 'testId01',
        observationId: '1',
        url: 'http://fakeurl.com',
        imageType: 'REAR',
        useToEnforce: true,
      },
      {
        photoId: '3',
        infractionId: 'testId01',
        observationId: '1',
        url: 'http://fakeurl.com',
        imageType: 'PLATE',
        useToEnforce: true,
      },
      {
        photoId: '4',
        infractionId: 'testId01',
        observationId: '2',
        url: 'http://fakeurl.com',
        imageType: 'PLATE',
        useToEnforce: true,
      },
    ];

    const plateImage = getPlateImage(activeParkadeInfractionMock, images);

    expect(plateImage).toEqual({
      photoId: '4',
      infractionId: 'testId01',
      observationId: '2',
      url: 'http://fakeurl.com',
      imageType: 'PLATE',
      useToEnforce: true,
    });
  });

  describe('get Event Start Time', () => {
    const permit = {
      effectiveDate: '2021-08-02T06:00:00.000Z',
      expiryDate: '2021-09-02T06:00:00.000Z',
    };
    test('Event is previously active ', () => {
      const licencePlateInfractions = [
        {
          id: 1,
          observations: [
            { observedAt: '2021-08-05T10:00:00.000Z' },
            { observedAt: '2021-08-05T11:00:00.000Z' },
          ],
        },
        {
          id: 2,
          observations: [
            { observedAt: '2021-08-05T13:00:00.000Z' },
            { observedAt: '2021-08-05T15:00:00.000Z' },
          ],
        },
      ];
      const eventStartTime = getEventStartTime(
        permit,
        licencePlateInfractions[0].observations[0],
        licencePlateInfractions.length
      );
      const date = licencePlateInfractions[0].observations[1].observedAt;
      const sod = new Date(date);
      sod.setHours(0, 0, 0, 0);
      const expected = new Date(sod).getTime();
      expect(eventStartTime).toEqual(expected);
    });

    test('Event not previously active', () => {
      const licencePlateInfractions = [
        {
          id: 1,
          observations: [
            { observedAt: '2021-08-01T14:00:00.000Z' },
            { observedAt: '2021-08-01T15:00:00.000Z' },
          ],
        },
      ];
      const eventStartTime = getEventStartTime(
        permit,
        licencePlateInfractions[0].observations[0],
        licencePlateInfractions.length
      );
      const expected = new Date(permit.effectiveDate).getTime();
      expect(eventStartTime).toEqual(expected);
    });
  });

  describe('Get Event End Time', () => {
    const permit = {
      effectiveDate: '2021-08-02T06:00:00.000Z',
      expiryDate: '2021-09-02T06:00:00.000Z',
    };
    test('Event is post active', () => {
      const licencePlateInfractions = [
        {
          id: 1,
          observations: [
            { observedAt: '2021-08-02T10:00:00.000Z' },
            { observedAt: '2021-08-05T11:00:00.000Z' },
          ],
        },
      ];
      const eventEndTime = getEventEndTime(
        permit,
        licencePlateInfractions[0].observations[1],
        licencePlateInfractions.length
      );
      const date = licencePlateInfractions[0].observations[1].observedAt;
      const eod = new Date(date);
      eod.setHours(23, 59, 59);
      const expected = new Date(eod).getTime();
      expect(eventEndTime).toEqual(expected);
    });
    test('Event not post active', () => {
      const licencePlateInfractions = [
        {
          id: 1,
          observations: [
            { observedAt: '2021-09-02T14:00:00.000Z' },
            { observedAt: '2021-09-02T15:00:00.000Z' },
          ],
        },
      ];
      const eventEndTime = getEventEndTime(
        permit,
        licencePlateInfractions[0],
        licencePlateInfractions.length
      );
      const expected = new Date(permit.expiryDate).getTime();
      expect(eventEndTime).toEqual(expected);
    });
  });

  describe('Get First Observation', () => {
    const infractions = [
      {
        id: 1,
        observations: [
          { id: 1, observedAt: '2021-09-02T15:00:00.000Z' },
          { id: 1, observedAt: '2021-09-02T13:00:00.000Z' },
        ],
      },
      {
        id: 2,
        observations: [{ id: 1, observedAt: '2021-09-02T18:00:00.000Z' }],
      },
    ];
    const firstObservation = getFirstObservation(infractions);
    expect(firstObservation).toEqual(infractions[0].observations[1]);
  });
  describe('Get Last Observation', () => {
    const infractions = [
      {
        id: 1,
        observations: [
          { id: 1, observedAt: '2021-09-02T15:00:00.000Z' },
          { id: 1, observedAt: '2021-09-02T13:00:00.000Z' },
        ],
      },
      {
        id: 2,
        observations: [{ id: 1, observedAt: '2021-09-02T18:00:00.000Z' }],
      },
    ];
    const firstObservation = getLastObservation(infractions);
    expect(firstObservation).toEqual(infractions[1].observations[0]);
  });

  describe('Get day of week', () => {
    const today = new Date('02-04-2022');
    const dayOfWeek = getDayOfWeek(today);
    expect(dayOfWeek).toEqual('FRIDAY');
  });

  describe('Get parking schedule start time', () => {
    const today = new Date('02-04-2022');
    const startTime = getParkingScheduleStartTime(permitMock, today);
    const expectedDate = today.setHours(8, 0, 0);
    expect(startTime).toEqual(new Date(expectedDate));
  });

  describe('Get parking schedule end time', () => {
    const today = new Date('02-04-2022');
    const startTime = getParkingScheduleEndTime(permitMock, today);
    const expectedDate = today.setHours(18, 0, 0);
    expect(startTime).toEqual(new Date(expectedDate));
  });

  describe('Sort Bylaws by section code', () => {
    const sortedBylaws = sortBylaws([...infractionBylaws]);
    expect(sortedBylaws[0]).toEqual(infractionBylaws[1]);
  });

  describe('Get Formatted Date', () => {
    it('should format date to use dashes instead of slashes', () => {
      const date = '2022/02/20';
      const formattedDate = getFormattedDate(date);
      expect(formattedDate).toEqual('2022-02-20');
    });

    it('should format date to `yyyy-mm-dd` when passing a date object', () => {
      const date = new Date('2022/12/01');
      const formattedDate = getFormattedDate(date);
      expect(formattedDate).toEqual('2022-12-01');
    });

    it('should format date to `yyyy-mm-dd` when passing an ISO date', () => {
      const date = new Date('2022/12/01').toISOString();
      const formattedDate = getFormattedDate(date);
      expect(formattedDate).toEqual('2022-12-01');
    });
  });
});
