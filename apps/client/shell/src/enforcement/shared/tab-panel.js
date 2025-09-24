import React from 'react';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      {value === index && children}
    </div>
  );
};

export default TabPanel;
