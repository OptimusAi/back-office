import React from 'react';
import Typography from '@material-ui/core/Typography';

const TitleComponent = ({ children, className }) => (
  <Typography variant="h6" className={className}>
    {children}
  </Typography>
);

export default TitleComponent;
