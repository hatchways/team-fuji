import { Grid } from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import TabTitle from './TabTitle';

type Props = {
  children: ReactElement[];
};

const Tabs: React.FC<Props> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Grid item container direction="row" alignItems="baseline" style={{ marginTop: '30px' }}>
      {children.map((item, index) => (
        <Grid item key={index}>
          <TabTitle title={item.props.title} index={index} setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
        </Grid>
      ))}
      {children[selectedTab]}
    </Grid>
  );
};

export default Tabs;
