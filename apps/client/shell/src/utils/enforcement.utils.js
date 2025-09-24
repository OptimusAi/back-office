import {
  infractionEvents,
  infractionStatus,
  observationTypes,
} from '../enforcement/enforcement.enums';
import { formatISO9075 } from 'date-fns';

export const getInfractionEventByStatus = (status) => {
  if (status === infractionStatus.enforceable) {
    return infractionEvents.verify;
  }
  if (status === infractionStatus.ignored) {
    return infractionEvents.ignore;
  }
  if (status === infractionStatus.verified) {
    return infractionEvents.verified;
  }
};

export const sortByDate = (list) => {
  const sorter = (a, b) => {
    return (
      new Date(a.observations[0].observedAt).getTime() -
      new Date(b.observations[0].observedAt).getTime()
    );
  };
  return list.sort(sorter);
};

export const getEventColor = (infraction) => {
  if (infraction.event === undefined) {
    return '#fff';
  }
  if (infraction.event === infractionEvents.ignore) {
    return '#616161';
  }
  if (infraction.event === infractionEvents.approve) {
    return '#f44336';
  }
  if (infraction.event === infractionEvents.warningIssued) {
    return '#f57c00';
  }
  return '#616161';
};

export const sortByEntryExit = (activeInfraction) => {
  let entryImage;
  let exitImage;
  let sortedImages = [];

  const entryObservation = activeInfraction.observations.find(
    (o) => o.eventType === observationTypes.entry
  );
  const exitObservation = activeInfraction.observations.find(
    (o) => o.eventType === observationTypes.exit
  );

  if (entryObservation !== undefined) {
    entryImage = activeInfraction.enforcementPhotos.find(
      (photo) =>
        photo.observationId === entryObservation.id &&
        photo.imageType !== 'PLATE'
    );
  }
  if (exitObservation !== undefined) {
    exitImage = activeInfraction.enforcementPhotos.find(
      (photo) =>
        photo.observationId === exitObservation.id &&
        photo.imageType !== 'PLATE'
    );
  }

  if (entryImage !== undefined) {
    sortedImages.push(entryImage);
  }
  if (exitImage !== undefined) {
    sortedImages.push(entryImage);
  }

  activeInfraction.enforcementPhotos.forEach((photo) => {
    sortedImages.push(photo);
  });

  const nonRepeatedImages = [...new Set(sortedImages)];
  return nonRepeatedImages;
};

export const getPlateImage = (activeInfraction, images) => {
  if (activeInfraction.observations.length === 2) {
    const validObservation =
      activeInfraction.observations.find(
        (o) => o.eventType === observationTypes.entry
      ) || activeInfraction.observations[0];
    return images.find(
      (img) =>
        img.observationId === validObservation.id && img.imageType === 'PLATE'
    );
  } else {
    return images.find((img) => img.imageType === 'PLATE');
  }
};

const getStartOfDay = (observation) => {
  const sod = new Date(observation.observedAt);
  return sod.setHours(0, 0, 0, 0);
};

const getEndOfDay = (observation) => {
  const date = observation.observedAt;
  const eod = new Date(date);
  return eod.setHours(23, 59, 59);
};

const isPrevActive = (timelineEvent, startDate) =>
  (new Date(timelineEvent.effectiveDate) ?? new Date(timelineEvent.start)) <=
  new Date(startDate);

const isPostActive = (timelineEvent, endDate) =>
  (new Date(timelineEvent.expiryDate) ?? new Date(timelineEvent.end)) >=
  new Date(endDate);

export const getEventStartTime = (timelineEvent, firstObservation) => {
  const eventPreviouslyActive = isPrevActive(
    timelineEvent,
    firstObservation.observedAt
  );

  const startOfDay = getStartOfDay(firstObservation);

  if (eventPreviouslyActive) {
    return startOfDay;
  } else {
    return new Date(
      timelineEvent.effectiveDate || timelineEvent.start
    ).getTime();
  }
};

export const getEventEndTime = (timelineEvent, lastObservation) => {
  const eventPostActive = isPostActive(
    timelineEvent,
    lastObservation.observedAt
  );
  const endOfDay = getEndOfDay(lastObservation);

  if (eventPostActive) {
    return endOfDay;
  } else {
    return new Date(timelineEvent.expiryDate || timelineEvent.end).getTime();
  }
};

export const getLastObservation = (infractions) => {
  const allObservations = infractions
    .map((i) => i.observations.map((o) => o))
    .flat();
  const sorter = (a, b) => {
    return new Date(a.observedAt).getTime() - new Date(b.observedAt).getTime();
  };
  const sortedObservations = allObservations.sort(sorter);
  return sortedObservations[sortedObservations.length - 1];
};

export const getFirstObservation = (infractions) => {
  const allObservations = infractions
    .map((i) => i.observations.map((o) => o))
    .flat();
  const sorter = (a, b) => {
    return new Date(a.observedAt).getTime() - new Date(b.observedAt).getTime();
  };
  const sortedObservations = allObservations.sort(sorter);
  return sortedObservations[0];
};

export const getDayOfWeek = (searchDate) => {
  const weekDays = [
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
  ];
  const searchedDate = new Date(searchDate);
  const dayOfWeek = weekDays[searchedDate.getDay()];
  return dayOfWeek;
};

export const getParkingScheduleStartTime = (permit, searchDate) => {
  const { parkingSchedule } = permit;
  const dayOfWeek = getDayOfWeek(searchDate);
  const todayParkingSchedule = parkingSchedule.find(
    (ps) => ps.day === dayOfWeek
  );
  if (todayParkingSchedule) {
    const searchedDate = new Date(searchDate);
    const parkingScheduleStartTime = todayParkingSchedule.time.start;
    const splittedTime = parkingScheduleStartTime.split(':');
    const toNumber = splittedTime.map((time) => Number(time));
    const startTime = searchedDate.setHours(
      toNumber[0],
      toNumber[1],
      toNumber[2]
    );
    const dateFromStartTime = new Date(startTime);
    return dateFromStartTime;
  }
};

export const getParkingScheduleEndTime = (permit, searchDate) => {
  const { parkingSchedule } = permit;
  const dayOfWeek = getDayOfWeek(searchDate);
  const todayParkingSchedule = parkingSchedule.find(
    (ps) => ps.day === dayOfWeek
  );
  if (todayParkingSchedule) {
    const searchedDate = new Date(searchDate);
    const parkingScheduleEndTime = todayParkingSchedule.time.end;
    const splittedTime = parkingScheduleEndTime.split(':');
    const toNumber = splittedTime.map((time) => Number(time));
    const endTime = searchedDate.setHours(
      toNumber[0],
      toNumber[1],
      toNumber[2]
    );
    const dateFromEndTime = new Date(endTime);
    return dateFromEndTime;
  }
};

export const getDatesBetweenDates = (startDate, endDate) => {
  let dates = [];
  const date = new Date(startDate);
  while (date < endDate) {
    dates = [...dates, new Date(date)];
    date.setDate(date.getDate() + 1);
  }
  return dates;
};

export const sortBylaws = (bylaws) => {
  return bylaws.sort((bylawA, bylawB) => {
    const primaryNumberA = parseFloat(
      bylawA.bylaw.sectionCode.match(/^\d+(\.\d+)?/)[0]
    );
    const primaryNumberB = parseFloat(
      bylawB.bylaw.sectionCode.match(/^\d+(\.\d+)?/)[0]
    );

    if (primaryNumberA === primaryNumberB) {
      const secondaryNumberA = parseInt(
        bylawA.bylaw.sectionCode.match(/\((\d+)\)/)?.[1] || 0,
        10
      );
      const secondaryNumberB = parseInt(
        bylawB.bylaw.sectionCode.match(/\((\d+)\)/)?.[1] || 0,
        10
      );
      return secondaryNumberA - secondaryNumberB;
    }

    return primaryNumberA - primaryNumberB;
  });
};

export const getFormattedDate = (date) => {
  return formatISO9075(new Date(date), { representation: 'date' });
};
