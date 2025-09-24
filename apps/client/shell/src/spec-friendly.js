import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { ThemeProvider } from '@park-plus/ui';
import english from './languages/en-CA';

const SpecFriendly = ({ children }) => (
  <IntlProvider locale="en-CA" messages={english}>
    <Provider store={configureStore({reducer: {test: (state = {}) => state}})}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </Provider>
  </IntlProvider>
);

export default SpecFriendly;
