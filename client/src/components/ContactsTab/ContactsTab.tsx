import { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { Grid, Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import useStyles from './useStyles';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {
  handleConversationId: (conversationId: string) => void;
}

interface Contact {
  id: number;
  conversationId: string;
}
export default function ContactsTab({ handleConversationId }: Props): JSX.Element {
  const classes = useStyles();

  // Mock Data, to use it POST 3 conversations and paste their conversationId
  // When invites are implemented this will no longer happen
  const group1: Contact = { id: 1, conversationId: '60be998d3771835bffaae014' };
  const group2: Contact = { id: 2, conversationId: '60c022229e61668ea77e1485' };
  const private1: Contact = { id: 3, conversationId: '60c023749e61668ea77e1486' };
  // const [contacts, setContacts] = useState<number[]>([...Array(4).keys()]);
  const [contacts, setContacts] = useState<Contact[]>([group1, group2, private1]);
  //TODO replace with list of contacts
  //const contacts = [0, 1, 2, 3, 4];

  // Implement loading contacts here
  const fetchMoreData = () => {
    setTimeout(() => {
      // setContacts(contacts.concat([...Array(4).keys()]));
    }, 1500);
  };

  return (
    <Grid container className={classes.root} direction="column">
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
                <ListItem
                  className={classes.item}
                  key={value.id}
                  button
                  onClick={() => handleConversationId(value.conversationId)}
                >
                  <ListItemAvatar>
                    <Avatar alt={`Avatar of ${value.id}`} src={`/static/images/avatar/${value.id}.jpg`} />
                  </ListItemAvatar>
                  <ListItemText className={classes.userName} id={labelId} primary={`Name ${value.id}`} />
                </ListItem>
              );
            })}
          </List>
        </InfiniteScroll>
      </Grid>
    </Grid>
  );
}
