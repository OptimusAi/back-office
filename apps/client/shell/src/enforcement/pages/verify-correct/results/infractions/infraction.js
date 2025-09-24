import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { useIntl } from 'react-intl';
import InfractionStatusIcon from './infraction-status-icon';

const Infraction = ({
  infraction,
  selected,
  onSelectInfraction,
}) => {
  const intl = useIntl();
  return (
    <ListItem
      button
      selected={selected}
      onClick={() =>
        onSelectInfraction(infraction.id)
      }
    >
      <ListItemIcon>
        <InfractionStatusIcon status={infraction.status} />
      </ListItemIcon>
      <ListItemText>{`${intl.formatTime(infraction.observedAt)}`}</ListItemText>
    </ListItem>
  );
};

export default Infraction;
