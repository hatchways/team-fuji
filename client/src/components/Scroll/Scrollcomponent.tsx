import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import useStyles from './useStyles';
import InfiniteScroll from 'react-infinite-scroll-component';

const Scroller = (): JSX.Element => {
  const [items, setItems] = useState<any[]>(Array.from({ length: 50 }));
  const classes = useStyles();

  const fetchMoreData = () => {
    setTimeout(() => {
      setItems(items.concat(Array.from({ length: 50 })));
    }, 1500);
  };

  return (
    <Grid id="scrollableDiv" className={classes.scrollerWrapper}>
      <h3 />
      <InfiniteScroll
        className={classes.scroller}
        height={`calc(80vh - 200px)`}
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
      >
        {items.map((i, index) => (
          <div key={index}>user - #{index}</div>
        ))}
      </InfiniteScroll>
    </Grid>
  );
};

export default Scroller;
