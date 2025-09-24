import React from 'react';
import { PopupMessage } from '@park-plus/ui';

const Popup = ({ message, type, open, onClearMessage }) => (
  <PopupMessage
    message={message}
    type={type}
    open={open}
    onClearMessage={onClearMessage}
  />
);

export default Popup;
