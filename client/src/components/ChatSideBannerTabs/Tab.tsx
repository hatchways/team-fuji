import { Box } from '@material-ui/core';
import React from 'react';

type Props = {
  title: string;
};

const Tab: React.FC<Props> = ({ children }) => {
  return <Box style={{ width: '100%' }}>{children}</Box>;
};

export default Tab;
