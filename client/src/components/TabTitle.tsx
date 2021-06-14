import { Button } from '@material-ui/core';
import React, { useCallback } from 'react';

type Props = {
  title: string;
  index: number;
  setSelectedTab: (index: number) => void;
};

const TabTitle: React.FC<Props> = ({ title, setSelectedTab, index }) => {
  const onClick = useCallback(() => {
    setSelectedTab(index);
  }, [setSelectedTab, index]);

  return (
    <Button onClick={onClick} style={{ marginTop: '30px', width: '80px' }}>
      {title}
    </Button>
  );
};

export default TabTitle;
