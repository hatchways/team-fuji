import { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { Grid, Button, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import useStyles from './useStyles';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReferFriend from '../../pages/ReferFriend/ReferFriend';
import { User } from '../../interface/User';

interface Props {
  contacts: User[];
  fetchMoreData: () => void;
  hasMore: boolean;
}

export default function ContactsTab({ contacts, fetchMoreData, hasMore }: Props): JSX.Element {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    history.back;
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container className={classes.root} direction="column">
      <Grid className={classes.searchBottomSeparator}></Grid>
      <Grid className={classes.inviteButtonBlock}>
        <Button onClick={handleClickOpen} className={classes.inviteButton} color="primary">
          + invite friends
        </Button>
        <ReferFriend open={open} handleClose={handleClose} />
      </Grid>
      <Grid id="scrollableDiv" className={classes.scrollerWrapper}>
        <InfiniteScroll
          className={classes.scroller}
          height={`10vh`}
          dataLength={contacts.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Typography> loading... </Typography>}
          scrollableTarget="scrollableDiv"
          endMessage={<Typography>No more contacts</Typography>}
        >
          <List dense className={classes.listStyle}>
            {contacts.map((contact, index) => {
              const labelId = `contact-${index}`;
              return (
                <ListItem className={classes.item} key={index} button>
                  <ListItemAvatar>
                    <Avatar alt={`Avatar of ${index + 1}`} src={`/static/images/avatar/${index + 1}.jpg`} />
                  </ListItemAvatar>
                  <ListItemText className={classes.userName} id={labelId} primary={contact.username} />
                </ListItem>
              );
            })}
          </List>
        </InfiniteScroll>
      </Grid>
    </Grid>
  );
}
