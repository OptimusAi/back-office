/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState, createElement } from 'react';
import classNames from 'classnames';
import { makeStyles, useTheme } from '@material-ui/core';
import { useIntl } from 'react-intl';
import { Timeline as SvgTimeline } from 'react-svg-timeline';
import AutoSizer from 'react-virtualized-auto-sizer';
import ActivityMarker from './activity.marker';
import {
  getEventColor,
  getEventStartTime,
  getEventEndTime,
  getFirstObservation,
  getLastObservation,
  getParkingScheduleStartTime,
  getParkingScheduleEndTime,
} from '../../../../utils/enforcement.utils';
import { Set as ImmutableSet } from 'immutable';
import {
  defaultPermitExpiryDate,
  observationTypes,
  permitTypes,
} from '../../../enforcement.enums';
import {
  getPermitEventsByRenderedDays,
  mapParkingSchedule,
} from '../../../enforcement.mappers';
import keys from '../../../../languages/keys';

const laneHeight = 80;

const useStyles = makeStyles((theme) => ({
  container: {
    marginLeft: theme.spacing(),
    minHeight: laneHeight,
    transition: 'height 0.5s',
    backgroundColor: theme.palette.grey.light,
    outline: 'none',
    '&:focus': {
      outline: 'none',
    },
  },
  backgroundMarker: {
    stroke: theme.palette.grey[700],
    strokeWidth: 2,
    fill: theme.palette.background.paper,
    zIndex: 0,
    cursor: 'pointer',
  },
  marker: {
    fillOpacity: 0.5,
    strokeWidth: 2,
    zIndex: 1,
  },
  selectedMarker: {
    stroke: theme.palette.grey[900],
    strokeWidth: 2,
    cursor: 'pointer',
  },
  entryExitMarker: {
    stroke: theme.palette.grey[700],
  },
}));

const LicencePlateTimeline = ({
  className,
  activeLicencePlate,
  activeInfraction,
  onInfractionSelect,
  licencePlateInfractions,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const intl = useIntl();
  const displayModes = Object.freeze({
    collapsed: 'collapsed',
    expanded: 'expanded',
  });
  const [displayMode, setDisplayMode] = useState(displayModes.expanded);
  const [pinnedEvents, setPinnedEvents] = useState(ImmutableSet());

  const lanes = useMemo(
    () =>
      activeLicencePlate.zones.map((zone) => ({
        laneId: zone.number,
        label: `Zone ${zone.number}`,
        color: theme.palette.common.black,
      })),
    [activeLicencePlate]
  );

  const getTooltipText = (infraction) => {
    if (infraction.observations[0].eventType === observationTypes.entry) {
      return `${intl.formatMessage({ id: keys.entry })}: ${intl.formatDate(
        infraction.observations[0].observedAt
      )} ${intl.formatMessage({ id: keys.at })} ${intl.formatTime(
        infraction.observations[0].observedAt, { hour12: false }
      )}`;
    }
    if (infraction.observations[0].eventType === observationTypes.exit) {
      return `${intl.formatMessage({ id: keys.exit })}: ${intl.formatDate(
        infraction.observations[0].observedAt
      )} ${intl.formatMessage({ id: keys.at })} ${intl.formatTime(
        infraction.observations[0].observedAt, { hour12: false }
      )}`;
    }
    if (infraction.observations[0].eventType === observationTypes.realtime) {
      return `${intl.formatMessage({ id: keys.zone })}: ${
        infraction.zone
      }\n${intl.formatMessage({ id: keys.time })}: ${intl.formatDate(
        infraction.observations[0].observedAt
      )} ${intl.formatMessage({ id: keys.at })} ${intl.formatTime(
        infraction.observations[0].observedAt, { hour12: false }
      )}`;
    }
  };

  const getPermitTooltip = (permit) => {
    const parkingSchedules = mapParkingSchedule(permit.parkingSchedule);
    const isDefaultExpiry = permit.expiryDate === defaultPermitExpiryDate;
    const stopString = isDefaultExpiry
      ? '\n'
      : `\n${intl.formatMessage({ id: keys.stop })}: ${intl.formatDate(
          permit.expiryDate
        )} ${intl.formatMessage({
          id: keys.at,
        })} ${intl.formatTime(permit.expiryDate, { hour12: false })}\n`;
    const stallsString =
      permit.permit.noOfStalls === null
        ? '\n'
        : `\n${intl.formatMessage({ id: keys.stalls })}: ${
            permit.permit.noOfStalls
          }\n`;

    if (permit.permit.category === permitTypes.exemptVehicle) {
      return `${intl.formatMessage({
        id: keys.exemptVehicle,
      })}\n${intl.formatMessage({
        id: keys.licencePlate,
      })}: ${permit.licencePlate}\n${intl.formatMessage({
        id: keys.zone,
      })}: ${permit.zones.map((z) => ` ${z}`)}\n${intl.formatMessage({
        id: keys.parkingSchedule,
      })}: ${parkingSchedules.map((p) => `\n${p.string}`)}`;
    } else {
      return `${intl.formatMessage({ id: keys.permit })}\n${intl.formatMessage({
        id: keys.start,
      })}: ${intl.formatDate(permit.effectiveDate)} at ${intl.formatTime(
        permit.effectiveDate, { hour12: false }
      )}${stopString}${intl.formatMessage({ id: keys.licencePlate })}: ${
        permit.licencePlate
      }\n${intl.formatMessage({ id: keys.zone })}: ${permit.zones.map(
        (z) => ` ${z}`
      )}${stallsString}\n${intl.formatMessage({
        id: keys.parkingSchedule,
      })}: ${parkingSchedules.map((p) => `\n${p.string}`)}`;
    }
  };

  const ensureEndAfterStart = (startMillis, endMillis) => {
    if (typeof endMillis === 'number' && endMillis > startMillis)
      return endMillis;
    return startMillis + 1000;
  };

  const events = useMemo(() => {
    if (licencePlateInfractions.length !== 0) {
      const sessions = activeLicencePlate.zones.filter(
        (zone) => zone.sessions !== null
      );

      const permits = activeLicencePlate.zones.filter(
        (zone) => zone.permitSchedules !== null
      );

      let sessionEvents = [];
      let permitEvents = [];
      const firstObservation = getFirstObservation(licencePlateInfractions);
      const lastObservation = getLastObservation(licencePlateInfractions);

      // create infraction events
      const infractionEvents = licencePlateInfractions.map((infraction) => {
        let eventObj = {};
        // create event object for paired infractions
        if (infraction.observations.length > 1) {
          const entryObservation = infraction.observations.find(
            (o) => o.eventType === observationTypes.entry
          );
          const exitObservation = infraction.observations.find(
            (o) => o.eventType === observationTypes.exit
          );
          const realtimeObservation = infraction.observations.find(
            (o) => o.eventType === observationTypes.realtime
          );

          eventObj = {
            eventId: infraction.id,
            startTimeMillis: entryObservation
              ? new Date(entryObservation.observedAt).getTime()
              : new Date(realtimeObservation.observedAt).getTime(),
            endTimeMillis: exitObservation
              ? new Date(exitObservation.observedAt).getTime()
              : new Date(realtimeObservation.observedAt).getTime(),
            color: getEventColor(infraction),
            tooltip: `${intl.formatMessage({
              id: keys.entry,
            })}: ${intl.formatDate(infraction.observations[0].observedAt, {
              hour12: false,
            })} ${intl.formatMessage({
              id: keys.at,
            })} ${intl.formatTime(infraction.observations[0].observedAt, {
              hour12: false,
            })}\n${intl.formatMessage({
              id: keys.exit,
            })}: ${intl.formatDate(infraction.observations[1].observedAt, {
              hour12: false,
            })} ${intl.formatMessage({
              id: keys.at,
            })} ${intl.formatTime(infraction.observations[1].observedAt, {
              hour12: false,
            })}`,
            laneId: infraction.zone,
            selected: infraction.id === activeInfraction.id,
            isEntryExit: true,
          };
        }
        // create event object for single infractions
        if (infraction.observations.length === 1) {
          const entryObservation = infraction.observations.find(
            (o) => o.eventType === observationTypes.entry
          );
          const exitObservation = infraction.observations.find(
            (o) => o.eventType === observationTypes.exit
          );

          const realtimeObservation = infraction.observations.find(
            (o) => o.eventType === observationTypes.realtime
          );

          const start = entryObservation
            ? new Date(entryObservation.observedAt).getTime()
            : new Date(
                realtimeObservation?.observedAt ||
                  infraction.observations[0].observedAt
              ).getTime();

          const rawEnd = exitObservation
            ? new Date(exitObservation.observedAt).getTime()
            : realtimeObservation
            ? new Date(realtimeObservation.observedAt).getTime()
            : undefined;

          eventObj = {
            eventId: infraction.id,
            startTimeMillis: new Date(
              infraction.observations[0].observedAt
            ).getTime(),
            endTimeMillis: ensureEndAfterStart(start, rawEnd),
            color: getEventColor(infraction),
            tooltip: getTooltipText(infraction),
            laneId: infraction.zone,
            selected: infraction.id === activeInfraction.id,
            isEntry:
              infraction.observations[0].eventType === observationTypes.entry,
            isExit:
              infraction.observations[0].eventType === observationTypes.exit,
            isEntryExit: true,
            labels: {
              observedAt: intl.formatTime(infraction.observations[0].observedAt, { hour12: false }),
            },
          };
        }
        return eventObj;
      });

      //create permit events
      if (permits.length !== 0) {
        permitEvents = activeLicencePlate.zones
          .map((zone) =>
            zone.permitSchedules.map((permit) => {
              const permitEventsByDayWeek = getPermitEventsByRenderedDays(
                firstObservation.observedAt,
                lastObservation.observedAt
              );
              const parkingScheduleEvents = permitEventsByDayWeek.map(
                (p, index) => {
                  const startTime = getParkingScheduleStartTime(permit, p.date);
                  const endTime = getParkingScheduleEndTime(permit, p.date);
                  if (startTime && endTime) {
                    const parkingScheduleEvent = {
                      eventId: `${index}-${permit.permit.id}`,
                      startTimeMillis: startTime.getTime(),
                      endTimeMillis: endTime.getTime(),
                      color: theme.palette.info.light,
                      tooltip: getPermitTooltip(permit),
                      laneId: zone.number,
                      isPermit: true,
                    };
                    return parkingScheduleEvent;
                  } else {
                    return null;
                  }
                }
              );
              return parkingScheduleEvents;
            })
          )
          .flat(2);
        permitEvents = permitEvents.filter((p) => p !== null);
      }

      //create session events
      if (sessions.length !== 0) {
        sessionEvents = activeLicencePlate.zones
          .map((zone) =>
            zone.sessions.map((session) => {
              const sessionEvent = {
                eventId: session.id,
                startTimeMillis: getEventStartTime(session, firstObservation),
                endTimeMillis: getEventEndTime(session, lastObservation),
                color: theme.palette.success.light,
                tooltip: `${intl.formatMessage({
                  id: keys.session,
                })}\n${intl.formatMessage({ id: keys.zone })}: ${
                  zone.number
                }\n${intl.formatMessage({
                  id: keys.start,
                })}: ${intl.formatDate(session.start, {
                  hour12: false,
                })} ${intl.formatMessage({
                  id: keys.at,
                })} ${intl.formatTime(session.start, {
                  hour12: false,
                })}\n${intl.formatMessage({
                  id: keys.stop,
                })}: ${intl.formatDate(session.end, {
                  hour12: false,
                })} ${intl.formatMessage({
                  id: keys.at,
                })} ${intl.formatTime(session.end, {
                  hour12: false,
                })}\n${intl.formatMessage({ id: keys.sessionCost })}: ${
                  '$' +
                  session.sessionCost.toFixed(2) +
                  ' ' +
                  session.activationSource
                }`,
                laneId: zone.number,
                isPinned: pinnedEvents.contains(session.id),
                labels: {
                  start: intl.formatTime(session.start, { hour12: false }),
                  end: intl.formatTime(session.end, { hour12: false }),
                  amount: '$' + session.sessionCost.toFixed(2),
                },
              };
              return sessionEvent;
            })
          )
          .flat();
      }
      const events = [...infractionEvents, ...sessionEvents, ...permitEvents];
      const set = new Set();
      const uniqueEvents = events.filter((el) => {
        const duplicate = set.has(el);
        set.add(el);
        return !duplicate;
      });
      return uniqueEvents;
    }
  }, [licencePlateInfractions, activeInfraction]);

  const allInfractions = useMemo(() => {
    const map = new Map();
    if (licencePlateInfractions.length !== 0) {
      licencePlateInfractions.forEach((infraction) => {
        map.set(infraction.id, infraction);
      });
      return map;
    }
  }, [licencePlateInfractions]);

  const allSessions = useMemo(() => {
    const map = new Map();
    activeLicencePlate.zones
      .map((zone) => zone.sessions)
      .flat()
      .forEach((session) => {
        map.set(session.id, session);
      });
    return map;
  }, [activeLicencePlate]);

  const onEventClick = (e) => {
    if (allSessions.has(e)) {
      setPinnedEvents((prevPinnedEvents) =>
        prevPinnedEvents.contains(e)
          ? prevPinnedEvents.remove(e)
          : prevPinnedEvents.add(e)
      );
    }

    if (allInfractions.has(e)) {
      if (e === activeInfraction.id) {
        return;
      } else {
        onInfractionSelect(e);
      }
    }
  };

  const eventComponentFactory = (e, role, timeScale, y) => {
    const other = { e, timeScale, y };

    if (e.isEntryExit && e.labels && e.labels.observedAt) {
      const { startTimeMillis, labels, color } = e;
      const circleX = timeScale(startTimeMillis);
      const circleY = y ;
      return (
        <g>      
          <circle
            cx={circleX}
            cy={circleY}
            r={12}
            fill={color}
            stroke="#333"
            opacity={0.8}
          />
          <text
            x={circleX}
            y={circleY + 28} 
            fontSize="12"
            fill="black"
            textAnchor="middle"
          >
            {labels.observedAt}
          </text>
        </g>
      );
    }

    if (e.labels && e.labels.start && e.labels.end) {
      const { startTimeMillis, endTimeMillis, labels, color } = e;
      const barX = timeScale(startTimeMillis);
      const barWidth = timeScale(endTimeMillis) - barX;
      const barY = y;
      const barHeight = 20;

      return (
        <g>
          {/* Bar */}
          <rect
            x={barX}
            y={barY}
            width={barWidth}
            height={barHeight}
            fill={color}
            opacity={0.5}
            stroke="#333"
          />
          {/* Start label */}
          <text
            x={barX + 5}
            y={barY + 15}
            fontSize="12"
            fill="black"
          >
            {labels.start}
          </text>
          {/* End label */}
          <text
            x={barX + barWidth - 5}
            y={barY + 15}
            fontSize="12"
            fill="black"
            textAnchor="end"
          >
            {labels.end}
          </text>
          {/* Duration label (centered) */}
          <text
            x={barX + barWidth / 2}
            y={barY + 15}
            fontSize="12"
            fill="black"
            textAnchor="middle"
          >
            {labels.amount}
          </text>
        </g>
      );
    }

    // Default rendering for other event types
    if (role === 'background') {
      return (
        <ActivityMarker
          data-testid="activityMarker"
          className={classes.backgroundMarker}
          {...other}
        />
      );
    }

    if (e.selected) {
      return (
        <ActivityMarker
          data-testid="activityMarker"
          className={classes.selectedMarker}
          {...other}
        />
      );
    }

    const cls = classNames({
      [classes.marker]: true,
      [classes.pinnedMarker]: e.isPinned,
      [classes.validMark]: e.isEntryOrExit && e.isValid,
      [classes.invalidMark]: e.isEntryOrExit && !e.isValid,
      [classes.entryExitMarker]: e.isEntryExit,
    });
    return <ActivityMarker className={cls} {...other} />;
  };

  const resolveHeight = () =>
    displayMode === displayModes.expanded
      ? lanes.length * laneHeight
      : laneHeight;

  return (
    <div
      className={classNames(classes.container, className)}
      style={{ height: resolveHeight() }}
    >
      <AutoSizer>
        {({ width, height }) => {
          const timelineProps = {
            width,
            height,
            dateFormat: (ms) =>
              Number.isNaN(ms) ? '' : intl.formatDate(new Date(ms)),
            lanes,
            events,
            laneDisplayMode: displayMode,
            onEventClick,
            eventComponent: eventComponentFactory,
          };
          return createElement(SvgTimeline, timelineProps);
        }}
      </AutoSizer>
    </div>
  );
};

export default LicencePlateTimeline;
