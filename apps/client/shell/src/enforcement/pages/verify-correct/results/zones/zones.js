/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { makeStyles, List } from '@material-ui/core';
import Zone from './zone';
import ZonesToolbar from './zones-toolbar';
import useSticky from '../../../../hooks/use-sticky';
import { roleTypes } from '../../../../../admin/admin.enums';

const useStyles = makeStyles((theme) => ({
  container: {
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 200,
  },
  zones: {
    overflowY: 'auto',
  },
}));

const Zones = ({
  zones,
  activeZone,
  onSelectZone,
  onSendToEnforce,
  onZoneFilterSelect,
  permissions,
  onMarkZone,
  onRelease,
}) => {
  const classes = useStyles();
  const { isSticky, element } = useSticky();
  const isVerification = permissions.includes(roleTypes[2]);
  const [displayZones, setDisplayZones] = useState([]);

  useEffect(() => {
    setDisplayZones(zones);
  }, [zones]);

  const handleSelectZone = (zone) => {
    if (activeZone === zone) {
      return;
    } else {
      onSelectZone(zone);
    }
  };

  return (
    <div className={classes.container} data-testid="zonesList">
      <ZonesToolbar
        sticky={isSticky}
        onZoneFilterSelect={onZoneFilterSelect}
        onSendToEnforce={isVerification ? onSendToEnforce : () => {}}
      />
      <List
        disablePadding
        className={classes.zones}
        style={{ marginTop: '48px' }}
      >
        {displayZones.length > 0 &&
          displayZones.map((zone) => (
            <Zone
              key={zone.id}
              zone={zone}
              selected={activeZone ? zone.id === activeZone.id : false}
              onSelectZone={handleSelectZone}
              onMarkZone={onMarkZone}
              onRelease={onRelease}
            />
          ))}
      </List>
    </div>
  );
};

export default Zones;
