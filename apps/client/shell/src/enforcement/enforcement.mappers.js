import 'regenerator-runtime/runtime';
import { getToken } from '../app/authentication/authority';
import { getDatesBetweenDates, getDayOfWeek } from '../utils/enforcement.utils';
import {
  infractionEvents,
  errorFields,
  failedFields,
} from './enforcement.enums';
import { enforcementErrorKeys, getErrorMessage } from './enforcement.errors';

const parkPlusToken = async () => await getToken();

export const formatImages = async (images) => {
  try {
    const token = await parkPlusToken();
    const imagesFormatted = images.map(async (img) => {
      let formattedImage = {
        id: img.photoId || img.id,
        infractionId: img.infractionId,
        observationId: img.observationId,
        imageType: img.imageType,
        src: `${img.url}?access_token=${await token}`,
        useToEnforce: img.useToEnforce,
        deviceId: img.deviceId,
        deviceType: img.deviceType,
        operatorName: img.operatorName,
      };
      return await formattedImage;
    });
    const formattedImages = await Promise.all(imagesFormatted);
    return formattedImages;
  } catch (error) {
    return [];
  }
};

export const getFormattedImages = async (activeInfraction) => {
  const images = await formatImages(activeInfraction);
  return await images;
};

export const getInfractionDetails = (list) => {
  const formattedList = list.map((i) => ({
    bylawId:
      i.event === infractionEvents.reject || i.event === undefined
        ? null
        : i.bylaw,
    event: i.event || infractionEvents.reject,
    infractionId: i.id,
  }));
  return formattedList;
};

const getErrorField = (errorField) => {
  if (errorField === errorFields.licencePlateNumber) {
    return enforcementErrorKeys.plateFormat;
  }
  return failedFields.default;
};

export const mapErrors = (payload) => {
  if (payload[0].message.includes('LicencePlate is not owned by user')) {
    return {
      type: 'error',
      message: getErrorMessage(enforcementErrorKeys.plateNotAssigned),
      open: true,
    };
  }
  if (payload[0].errors) {
    const errors = Object.entries(payload[0].errors);
    const mappedErrors = errors.map((e) => ({
      type: 'error',
      message: getErrorMessage(getErrorField(e[0])),
      open: true,
    }));
    return mappedErrors[0];
  }
  if (payload[0].message.includes('image_should_be_selected')) {
    return {
      type: 'error',
      message: getErrorMessage(enforcementErrorKeys.imageSelect),
      open: true,
    };
  } else if (payload[0].message.includes('bylaw.invalid.bylaw_id')) {
    return {
      type: 'error',
      message: getErrorMessage(enforcementErrorKeys.defaultBylaw),
      open: true,
    };
  } else if (
    payload[0].message.includes('status: PERMISSIBLE) with Event: REVERIFY')
  ) {
    return {
      type: 'error',
      message: getErrorMessage(enforcementErrorKeys.permissible),
      open: true,
    };
  } else if (payload[0].message.includes('Infraction is not owned by user')) {
    return {
      type: 'error',
      message: getErrorMessage(enforcementErrorKeys.infractionNotAssigned),
      open: true,
    };
  } else {
    return {
      type: 'error',
      message: getErrorMessage(enforcementErrorKeys.default),
      open: true,
    };
  }
};

export const formatSchedules = (schedules) => {
  const formattedSchedules = schedules.map((schedule, index, arr) => {
    const abbrs =
      navigator.language !== 'fr'
        ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        : ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    const days = {
      MONDAY: { index: 0, abbr: abbrs[0] },
      TUESDAY: { index: 1, abbr: abbrs[1] },
      WEDNESDAY: { index: 2, abbr: abbrs[2] },
      THURSDAY: { index: 3, abbr: abbrs[3] },
      FRIDAY: { index: 4, abbr: abbrs[4] },
      SATURDAY: { index: 5, abbr: abbrs[5] },
      SUNDAY: { index: 6, abbr: abbrs[6] },
    };
    return {
      index: days[schedule.day].index,
      day: schedule.day,
      abbr: days[schedule.day].abbr,
      compare: schedule.time.start.concat(schedule.time.end),
      time: `${schedule.time.start} - ${schedule.time.end}`,
    };
  });
  return formattedSchedules;
};

export const mapParkingSchedule = (schedules) => {
  let repeatedSchedules = [];
  let uniqueSchedules = [];
  const formattedSchedules = formatSchedules(schedules);

  formattedSchedules.forEach((schedule, index, arr) => {
    const scheduleCompare = schedule.compare;
    const previousSchedule = index > 0 ? arr[index - 1].compare : null;
    const previousScheduleIndex = index > 0 ? arr[index - 1].index : null;
    const nextSchedule =
      index <= arr.length - 2 ? arr[index + 1].compare : null;
    const nextScheduleIndex =
      index <= arr.length - 2 ? arr[index + 1].index : null;

    if (index === 0) {
      if (
        scheduleCompare === nextSchedule &&
        schedule.index + 1 === nextScheduleIndex
      ) {
        return repeatedSchedules.push([schedule, arr[index + 1]]);
      }
      if (
        scheduleCompare === nextSchedule &&
        schedule.index + 1 !== nextScheduleIndex
      ) {
        return uniqueSchedules.push(schedule);
      }
      if (scheduleCompare !== nextSchedule) {
        return uniqueSchedules.push(schedule);
      }
    }
    if (index > 0 && index < arr.length - 1) {
      if (
        scheduleCompare === nextSchedule &&
        schedule.index + 1 === nextScheduleIndex
      ) {
        return repeatedSchedules.push([schedule, arr[index + 1]]);
      }
      if (
        scheduleCompare === previousSchedule &&
        schedule.index - 1 !== previousScheduleIndex
      ) {
        return uniqueSchedules.push(schedule);
      }
      if (
        scheduleCompare !== previousSchedule &&
        scheduleCompare !== nextSchedule
      ) {
        return uniqueSchedules.push(schedule);
      }
    }
    if (index === arr.length - 1) {
      if (
        scheduleCompare === previousSchedule &&
        schedule.index - 1 !== previousScheduleIndex
      ) {
        return uniqueSchedules.push(schedule);
      }
      if (scheduleCompare !== previousSchedule) {
        return uniqueSchedules.push(schedule);
      }
    }
  });

  let filteredRepeatedSchedules = [];
  let contiguousRepeatedSchedules = [];
  let allRepeatedSchedules = [];

  if (repeatedSchedules.length > 0) {
    repeatedSchedules.forEach((schedule, index, arr) => {
      const scheduleCompare = schedule.compare;
      const nextSchedule =
        index <= arr.length - 2 ? arr[index + 1][0].compare : null;
      if (index <= repeatedSchedules.length - 2) {
        if (scheduleCompare === nextSchedule) {
          repeatedSchedules[index].splice(
            2,
            0,
            repeatedSchedules[index + 1][1]
          );
          repeatedSchedules[index + 1].splice(0, 2);
        }
      }
    });

    filteredRepeatedSchedules = repeatedSchedules.filter(
      (schedule) => schedule.length > 0
    );

    filteredRepeatedSchedules.forEach((groupedSchedules, index, arr) => {
      if (arr.length === 1) {
        allRepeatedSchedules = allRepeatedSchedules.concat([groupedSchedules]);
      }
      if (index <= arr.length - 2) {
        if (
          groupedSchedules[groupedSchedules.length - 1].index ===
          arr[index + 1][0].index
        ) {
          contiguousRepeatedSchedules = [
            ...new Set(
              contiguousRepeatedSchedules.concat(
                groupedSchedules,
                arr[index + 1]
              )
            ),
          ];
        }
        if (index === 0) {
          if (
            groupedSchedules[groupedSchedules.length - 1].index !==
            arr[index + 1][0].index
          ) {
            allRepeatedSchedules = allRepeatedSchedules.concat([
              groupedSchedules,
            ]);
          }
        }
        if (index > 0) {
          if (
            groupedSchedules[0].index !==
              arr[index - 1][groupedSchedules.length - 1].index &&
            groupedSchedules[groupedSchedules.length - 1].index !==
              arr[index + 1][0].index
          ) {
            allRepeatedSchedules = allRepeatedSchedules.concat([
              groupedSchedules,
            ]);
          }
        }
      }
      if (index === arr.length - 1 && arr.length > 1) {
        if (
          groupedSchedules[groupedSchedules.length - 1].index - 1 !==
          arr[index - 1][arr[index - 1].length - 1].index
        ) {
          allRepeatedSchedules = allRepeatedSchedules.concat([
            groupedSchedules,
          ]);
        }
      }
    });

    allRepeatedSchedules =
      contiguousRepeatedSchedules.length > 0
        ? allRepeatedSchedules.concat([contiguousRepeatedSchedules])
        : allRepeatedSchedules;
  }

  let finalSchedules = [];

  if (allRepeatedSchedules.length > 0) {
    allRepeatedSchedules.forEach((schedule, index) => {
      return finalSchedules.push({
        index: schedule[0].index,
        string: `${schedule[0].abbr}-${schedule[schedule.length - 1].abbr}: ${
          schedule[0].time
        }`,
      });
    });
  }

  if (uniqueSchedules.length > 0) {
    uniqueSchedules.forEach((schedule) => {
      return finalSchedules.push({
        index: schedule.index,
        string: `${schedule.abbr}: ${schedule.time}`,
      });
    });
  }

  finalSchedules.sort((a, b) => a.index - b.index);

  return finalSchedules;
};

export const getPermitEventsByRenderedDays = (firstDate, lastDate) => {
  const firstDayDisplayed = new Date(firstDate);
  const lastDayDisplayed = new Date(lastDate);
  const stringDays = [
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY',
  ];
  const datesInBetween = getDatesBetweenDates(
    firstDayDisplayed,
    lastDayDisplayed
  );

  if (datesInBetween.length === 0) {
    const weekDay = getDayOfWeek(firstDate);
    return [
      {
        date: firstDate,
        weekDay,
        index: stringDays.indexOf(weekDay),
      },
    ];
  } else {
    const dayWeeksInBetween = datesInBetween.map((d) => getDayOfWeek(d));
    const mappedRenderedDays = datesInBetween.map((d, i) => {
      let dayObj = {
        date: d,
        weekDay: dayWeeksInBetween[i],
        index: stringDays.indexOf(dayWeeksInBetween[i]),
      };
      return dayObj;
    });
    return mappedRenderedDays;
  }
};
