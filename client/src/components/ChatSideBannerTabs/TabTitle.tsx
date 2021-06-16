import { Button } from '@material-ui/core';
import React, { useCallback } from 'react';
import useStyles from './useStyles';
type Props = {
  selectedTab: number;
  title: string;
  index: number;
  setSelectedTab: (index: number) => void;
};

const TabTitle: React.FC<Props> = ({ title, setSelectedTab, index, selectedTab }) => {
  const classes = useStyles();
  const onClick = useCallback(() => {
    setSelectedTab(index);
  }, [setSelectedTab, index]);

  return (
    <Button
      disableRipple
      disableTouchRipple
      onClick={onClick}
      className={selectedTab == index ? classes.selectedTab : classes.unSelectedTab}
    >
      {title}
    </Button>
  );
};

export default TabTitle;

// style={{ marginTop: '30px', width: '80px' }}
// () => {selectedTab === index ? (fontSize: 20) : (fontSize: 1)}
