import { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { Grid, Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import useStyles from './useStyles';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReferFriend from '../../pages/ReferFriend/ReferFriend';

export default function ContactsTab(): JSX.Element {
  const classes = useStyles();
  const [contacts, setContacts] = useState<number[]>([...Array(50).keys()]);
  const [openDialog, setOpenDialog] = useState(false);

  //TODO replace with list of contacts
  //const contacts = [0, 1, 2, 3, 4];

  // Implement loading contacts here
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
    console.log('openDialog: ' + openDialog);
  };
  const fetchMoreData = () => {
    setTimeout(() => {
      setContacts(contacts.concat([...Array(50).keys()]));
    }, 1500);
  };

  return (
    <Grid container className={classes.root} direction="column">
      <Grid className={classes.searchBottomSeparator}></Grid>
      <Grid className={classes.inviteButtonBlock}>
        <Button className={classes.inviteButton} onClick={handleClickOpenDialog} color="primary">
          + invite friends
        </Button>
        <ReferFriend openState={openDialog} />
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
