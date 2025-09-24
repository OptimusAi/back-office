import React from 'react';
import { Busy } from '@park-plus/ui';

const BusyAware = ({ busy, children }) => (busy ? <Busy busy /> : children);

export default BusyAware;
