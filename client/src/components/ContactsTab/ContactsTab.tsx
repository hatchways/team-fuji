import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { Grid, TextField, Button, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './useStyles';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function ContactsTab() {
  const classes = useStyles();
  const [contacts, setContacts] = useState<any[]>([...Array(50).keys()]);

  //TODO replace with list of contacts
  //const contacts = [0, 1, 2, 3, 4];

  // Implement loading contacts here
  const fetchMoreData = () => {
    setTimeout(() => {
      setContacts(contacts.concat([...Array(50).keys()]));
    }, 1500);
  };

  return (
    <Grid container className={classes.root} direction="column">
      {/* <Grid className={classes.leftPadding}>
        <TextField
          className={classes.searchInput}
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
            disableUnderline: true,
          }}
        />
      </Grid> */}
      <Grid className={classes.searchBottomSeparator}></Grid>
      <Grid className={classes.inviteButtonBlock}>
        <Button className={classes.inviteButton} color="primary">
          + invite friends
        </Button>
      </Grid>
      <Grid id="scrollableDiv" className={classes.scrollerWrapper}>
        <InfiniteScroll
          className={classes.scroller}
          height={`calc(80vh - 200px)`}
          dataLength={contacts.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          <List dense className={classes.listStyle}>
            {contacts.map((value) => {
              const labelId = `contact-${value}`;
              return (
                <ListItem className={classes.item} key={value} button>
                  <ListItemAvatar>
                    <Avatar alt={`Avatar of ${value + 1}`} src={`/static/images/avatar/${value + 1}.jpg`} />
                  </ListItemAvatar>
                  <ListItemText className={classes.userName} id={labelId} primary={`Name ${value + 1}`} />
                </ListItem>
              );
            })}
          </List>
        </InfiniteScroll>
      </Grid>
    </Grid>
  );
}
